use crate::config::toml::is_toml_table_start::is_toml_table_start;
use crate::config::toml::read_toml_header::read_toml_header;
use crate::config::toml::toml_table_range::TomlTableRange;

/// Finds `[table_key]` with its key/value lines; with `with_subtables`, also the `[table_key.*]` tables right after it.
pub fn find_toml_table(lines: &[&str], table_key: &str, with_subtables: bool) -> Option<TomlTableRange> {
    let start = lines
        .iter()
        .position(|line| read_toml_header(line).as_deref() == Some(table_key))?;
    let subtable_prefix = format!("{table_key}.");
    let mut end = start + 1;
    while let Some(line) = lines.get(end) {
        let is_own_subtable =
            with_subtables && read_toml_header(line).is_some_and(|header| header.starts_with(&subtable_prefix));
        if is_toml_table_start(line) && !is_own_subtable {
            break;
        }
        end += 1;
    }
    Some(TomlTableRange { start, end })
}
