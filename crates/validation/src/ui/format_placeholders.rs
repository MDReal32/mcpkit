/// `{a}, {b}`, how the errors list unknown placeholders.
pub fn format_placeholders(names: &[&str]) -> String {
    names
        .iter()
        .map(|name| format!("{{{name}}}"))
        .collect::<Vec<_>>()
        .join(", ")
}
