use mcpkit_core::js::js_trim_start;

pub fn is_toml_table_start(line: &str) -> bool {
    js_trim_start(line).starts_with('[')
}
