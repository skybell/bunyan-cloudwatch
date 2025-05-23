import {FlatCompat} from "@eslint/eslintrc";
import {defineConfig} from "eslint/config";
import {fileURLToPath} from "node:url";
import globals from "globals";
import js from "@eslint/js";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("eslint:recommended"),

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.mocha,
            inject: true,
            chai: true,
        },

        ecmaVersion: "latest",
        sourceType: "module"
    },

    rules: {
        "accessor-pairs": 2,
        "array-bracket-spacing": [2, "never"],
        "array-callback-return": 2,
        "arrow-body-style": [2, "as-needed"],
        "arrow-parens": 2,

        "arrow-spacing": [2, {
            before: true,
            after: true,
        }],

        "block-scoped-var": 2,
        "block-spacing": [2, "always"],

        "brace-style": [2, "1tbs", {
            allowSingleLine: true,
        }],

        "callback-return": 2,
        camelcase: 0,

        "comma-spacing": [2, {
            before: false,
            after: true,
        }],

        "comma-style": [2, "last"],
        "computed-property-spacing": [2, "never"],
        "consistent-return": 0,
        "consistent-this": [2, "that", "self"],
        curly: 2,
        "default-case": 2,
        "dot-location": [2, "property"],

        "dot-notation": [2, {
            allowKeywords: true,
        }],

        "eol-last": 2,
        eqeqeq: 2,
        "func-names": 0,
        "func-style": 0,
        "generator-star-spacing": 2,
        "global-require": 0,
        "guard-for-in": 2,
        "handle-callback-err": 2,
        "id-blacklist": 2,
        "id-length": 0,
        "id-match": 0,
        indent: 2,
        "init-declarations": 0,
        "key-spacing": 0,
        "keyword-spacing": 0,
        "linebreak-style": [2, "unix"],
        "lines-around-comment": 0,
        "max-len": 0,
        "new-cap": 0,
        "new-parens": 2,
        "newline-after-var": 0,
        "newline-per-chained-call": 0,
        "no-alert": 0,
        "no-array-constructor": 2,
        "no-bitwise": 2,
        "no-caller": 2,
        "no-catch-shadow": 2,
        "no-confusing-arrow": 2,
        "no-console": 0,
        "no-continue": 0,
        "no-div-regex": 2,
        "no-regex-spaces": 0,
        "no-else-return": 2,
        "no-empty-function": 2,
        "no-eq-null": 2,
        "no-eval": 2,
        "no-extend-native": 2,
        "no-extra-bind": 2,
        "no-extra-label": 2,
        "no-extra-parens": 0,
        "no-floating-decimal": 2,
        "no-implicit-coercion": 2,
        "no-implicit-globals": 2,
        "no-implied-eval": 2,
        "no-inline-comments": 0,
        "no-invalid-this": 0,
        "no-iterator": 2,
        "no-label-var": 2,
        "no-labels": 2,
        "no-lone-blocks": 2,
        "no-lonely-if": 2,
        "no-loop-func": 2,
        "no-magic-numbers": 0,
        "no-mixed-requires": 0,
        "no-multi-spaces": 0,
        "no-multi-str": 2,
        "no-multiple-empty-lines": 2,
        "no-native-reassign": 2,
        "no-negated-condition": 0,
        "no-nested-ternary": 2,
        "no-new": 2,
        "no-new-func": 2,
        "no-new-object": 2,
        "no-new-require": 2,
        "no-new-wrappers": 2,
        "no-octal-escape": 2,

        "no-param-reassign": [0, {
            props: false,
        }],

        "no-path-concat": 0,
        "no-plusplus": 0,
        "no-process-env": 0,
        "no-process-exit": 0,
        "no-proto": 2,
        "no-restricted-imports": 2,
        "no-restricted-modules": 2,
        "no-restricted-syntax": 2,
        "no-return-assign": 2,
        "no-script-url": 2,
        "no-self-compare": 2,
        "no-sequences": 2,
        "no-shadow": 2,
        "no-shadow-restricted-names": 2,
        "no-spaced-func": 2,
        "no-sync": 0,
        "no-ternary": 0,
        "no-throw-literal": 2,
        "no-trailing-spaces": 2,
        "no-undef-init": 2,
        "no-undefined": 2,
        "no-underscore-dangle": 0,
        "no-unmodified-loop-condition": 2,
        "no-unneeded-ternary": 2,
        "no-unused-expressions": 2,

        "no-unused-vars": [2, {
            args: "none",
        }],

        "no-use-before-define": [2, {
            classes: false,
            functions: false,
        }],

        "no-useless-call": 2,
        "no-useless-concat": 2,
        "no-useless-constructor": 2,
        "no-var": 0,
        "no-void": 2,
        "no-warning-comments": 0,
        "no-whitespace-before-property": 2,
        "no-with": 2,

        "object-curly-spacing": [2, "never", {
            objectsInObjects: false,
            arraysInObjects: false,
        }],

        "object-shorthand": 2,
        "one-var": 0,
        "one-var-declaration-per-line": 0,
        "operator-assignment": 2,
        "operator-linebreak": 2,
        "padded-blocks": [2, "never"],
        "prefer-arrow-callback": 0,
        "prefer-const": 2,
        "prefer-reflect": 0,
        "prefer-rest-params": 2,
        "prefer-spread": 2,
        "prefer-template": 0,
        "quote-props": 0,
        quotes: 0,
        radix: 2,
        "require-yield": 2,
        semi: 2,
        "semi-spacing": 2,
        "sort-imports": 0,
        "sort-vars": 0,
        "space-before-blocks": 0,
        "space-before-function-paren": 0,
        "space-in-parens": [2, "never"],
        "space-infix-ops": 0,
        "space-unary-ops": 2,
        "spaced-comment": 0,
        strict: 2,
        "template-curly-spacing": 2,
        "vars-on-top": 0,
        "wrap-iife": 2,
        "wrap-regex": 2,
        "yield-star-spacing": 2,
        yoda: [2, "never"],
    },
}]);
