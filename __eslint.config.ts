import _stylistic from "@stylistic/eslint-plugin";
import editorconfig from "./config/editorconfig";

import type Stylistic from "@stylistic/eslint-plugin/dist/dts";
import type { Linter } from "eslint";

const stylistic: typeof Stylistic = _stylistic as unknown as typeof Stylistic;

const {
    indent_size,
    end_of_line,
    insert_final_newline,
    trim_trailing_whitespace,
} = editorconfig;

console.log(stylistic.configs.customize({
    // the following options are the default values
    indent: indent_size,
    quotes: "double",
    semi: true,
    
}))


export default [
    {
        ...stylistic.configs.customize({
            // the following options are the default values
            indent: indent_size,
            quotes: "double",
            semi: true,
            
        }),
        
    }
] satisfies Linter.BaseConfig<Linter.RulesRecord, Linter.RulesRecord>[];
