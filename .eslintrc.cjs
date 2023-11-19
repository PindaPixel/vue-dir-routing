/* eslint-env node */
const editorConfig = require("editorconfig");

const parsedConfig = editorConfig.parseSync();

/**
 * @type {{ [Key in keyof editorConfig.KnownProps]: Exclude<editorConfig.KnownProps[Key], "unset"> }}
 */
const { indent_size, end_of_line, insert_final_newline, trim_trailing_whitespace } = {
    indent_size: parsedConfig.indent_size === "unset" ? 4 : parsedConfig.indent_size,
    end_of_line: parsedConfig.end_of_line === "unset" ? "lf" : parsedConfig.end_of_line,
    insert_final_newline: parsedConfig.insert_final_newline === "unset" ?  false : parsedConfig.insert_final_newline,
    trim_trailing_whitespace: parsedConfig.trim_trailing_whitespace === "unset" ? true : parsedConfig.trim_trailing_whitespace
}


/**
 * @type {import("eslint").ESLint.ConfigData}
 */
module.exports = {
    root: true,
    plugins: ["@stylistic"],
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/eslint-config-typescript",
    ],
    overrides: [
        {
            files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}"],
            extends: ["plugin:cypress/recommended"],
        },
    ],
    rules: {
        "@stylistic/indent": ["error", indent_size],
        "@stylistic/eol-last": ["error", insert_final_newline ? "always" : "never"],
        "@stylistic/linebreak-style": ["error", end_of_line],
        "@stylistic/no-trailing-spaces": ["error", trim_trailing_whitespace],
        "@stylistic/brace-style": ["error", "allman"]
    },
    parserOptions: {
        ecmaVersion: "latest",
    },
};
