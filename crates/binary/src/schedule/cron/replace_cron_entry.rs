use crate::schedule::consts::CRON_MARKER;

/// The crontab without mcpkit's line, plus `line` when given; every other line is kept as it is.
pub fn replace_cron_entry(crontab: &str, line: Option<&str>) -> String {
    let lines: Vec<&str> = crontab
        .split('\n')
        .filter(|entry| !entry.is_empty() && !entry.ends_with(CRON_MARKER))
        .chain(line)
        .collect();
    if lines.is_empty() {
        return String::new();
    }
    format!("{}\n", lines.join("\n"))
}
