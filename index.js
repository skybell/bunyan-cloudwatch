
var util = require('util');
var Writable = require('stream').Writable;
const {CloudWatchLogsClient, PutLogEventsCommand} = require("@aws-sdk/client-cloudwatch-logs");
var safeJsonStringify = require('safe-json-stringify');

var jsonStringify = safeJsonStringify ? safeJsonStringify : JSON.stringify;

// CommonJS export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = createCloudWatchStream;
}

// ESM export
export default createCloudWatchStream;

function createCloudWatchStream(opts) {
    return new CloudWatchStream(opts);
}

const cloudwatchlogsInit = (AWSInit) => ({
    putLogEvents: (params, cb) => {
        const cloudwatchlogs = new CloudWatchLogsClient(AWSInit);
        const command = new PutLogEventsCommand(params);
        return cloudwatchlogs.send(command, cb);
    }
});

util.inherits(CloudWatchStream, Writable);
function CloudWatchStream(opts) {
    Writable.call(this, {objectMode: true});
    this.logGroupName = opts.logGroupName;
    this.logStreamName = opts.logStreamName;
    this.writeInterval = opts.writeInterval || 0;

    this.cloudwatch = cloudwatchlogsInit(opts.cloudWatchLogsOptions);

    this.queuedLogs = [];
    this.sequenceToken = null;
    this.writeQueued = false;
}

CloudWatchStream.prototype._write = function _write(record, _enc, cb) {
    this.queuedLogs.push(record);
    if (!this.writeQueued) {
        this.writeQueued = true;
        setTimeout(this._writeLogs.bind(this), this.writeInterval);
    }
    cb();
};

CloudWatchStream.prototype._writeLogs = function _writeLogs() {
    if (this.sequenceToken === null) {
        return this._getSequenceToken(this._writeLogs.bind(this));
    }
    var log = {
        logGroupName: this.logGroupName,
        logStreamName: this.logStreamName,
        sequenceToken: this.sequenceToken,
        logEvents: this.queuedLogs.map(createCWLog)
    };
    this.queuedLogs = [];
    var obj = this;
    writeLog();

    function writeLog() {
        obj.cloudwatch.putLogEvents(log, function (err, res) {
            if (err) {
                if (err.retryable) { return setTimeout(writeLog, obj.writeInterval); }
                if (err.code === 'InvalidSequenceTokenException') {
                    return obj._getSequenceToken(function () {
                        log.sequenceToken = obj.sequenceToken;
                        setTimeout(writeLog, obj.writeInterval);
                    });
                }
                return obj._error(err);
            }
            obj.sequenceToken = res.nextSequenceToken;
            if (obj.queuedLogs.length) {
                return setTimeout(obj._writeLogs.bind(obj), obj.writeInterval);
            }
            obj.writeQueued = false;
        });
    }
};

CloudWatchStream.prototype._getSequenceToken = function _getSequenceToken(done) {
    var params = {
        logGroupName: this.logGroupName,
        logStreamNamePrefix: this.logStreamName
    };
    var obj = this;
    this.cloudwatch.describeLogStreams(params, function (err, data) {
        if (err) {
            if (err.name === 'ResourceNotFoundException') {
                createLogGroupAndStream(obj.cloudwatch, obj.logGroupName, obj.logStreamName, createStreamCb);
                return;
            }
            obj._error(err);
            return;
        }
        if (data.logStreams.length === 0) {
            createLogStream(obj.cloudwatch, obj.logGroupName, obj.logStreamName, createStreamCb);
            return;
        }
        obj.sequenceToken = data.logStreams[0].uploadSequenceToken;
        done();
    });

    function createStreamCb(err) {
        if (err) { return obj._error(err); }
        // call again to verify stream was created - silently fails sometimes!
        obj._getSequenceToken(done);
    }
};

CloudWatchStream.prototype._error = function _error(err) {
    if (this.onError) { return this.onError(err); }
    throw err;
};

function createLogGroupAndStream(cloudwatch, logGroupName, logStreamName, cb) {
    cloudwatch.createLogGroup({
        logGroupName
    }, function (err) {
        if (err) { return err; }
        createLogStream(cloudwatch, logGroupName, logStreamName, cb);
    });
}

function createLogStream(cloudwatch, logGroupName, logStreamName, cb) {
    cloudwatch.createLogStream({
        logGroupName,
        logStreamName
    }, cb);
}

function createCWLog(bunyanLog) {
    var message = {};
    for (var key in bunyanLog) {
        if (key === 'time') { continue; }
        message[key] = bunyanLog[key];
    }

    var log = {
        message: jsonStringify(message),
        timestamp: new Date(bunyanLog.time).getTime()
    };

    return log;
}
