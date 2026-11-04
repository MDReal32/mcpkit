use serde::Serialize;
use serde_json::Value;
use serde_json::ser::{PrettyFormatter, Serializer};
use std::path::Path;

/// Rewrites a golden fixture with `value`, keeping the indent the file already has (one or two spaces) and its final
/// newline. The file is replaced in one rename, so a test reading it at the same time never sees half of it.
pub fn write_golden(path: &Path, value: &Value) {
    let indent = std::fs::read_to_string(path)
        .ok()
        .and_then(|text| text.lines().nth(1).map(|line| line.len() - line.trim_start().len()))
        .filter(|width| *width > 0)
        .unwrap_or(2);
    let indent = " ".repeat(indent);
    let mut text = Vec::new();
    let mut serializer = Serializer::with_formatter(&mut text, PrettyFormatter::with_indent(indent.as_bytes()));
    value.serialize(&mut serializer).unwrap();
    text.push(b'\n');
    let temporary = path.with_extension("json.tmp");
    std::fs::write(&temporary, text).unwrap();
    std::fs::rename(&temporary, path).unwrap();
}
