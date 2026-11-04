use crate::platform::target::Target;

/// `name` with the executable extension of `target`: `mcpkit.exe` on Windows, `mcpkit` elsewhere.
pub fn to_binary_file_name(target: Target, name: &str) -> String {
    let extension = if target.name().starts_with("windows") {
        ".exe"
    } else {
        ""
    };
    format!("{name}{extension}")
}
