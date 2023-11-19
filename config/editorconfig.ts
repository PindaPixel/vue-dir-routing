import editorConfig from "editorconfig";
import { cwd } from "node:process";

const parsedConfig = editorConfig.parseSync(cwd(), { unset: true });

type EditorConfig = Required<{
    [Key in keyof editorConfig.KnownProps]: Exclude<
        editorConfig.KnownProps[Key],
        "unset"
    >;
}>;

const defaults: EditorConfig = {
    charset: "utf-8",
    end_of_line: "lf",
    indent_size: 4,
    indent_style: "space",
    insert_final_newline: false,
    tab_width: 4,
    trim_trailing_whitespace: true,
};

export default {
    ...defaults,
    ...parsedConfig
} as EditorConfig;
