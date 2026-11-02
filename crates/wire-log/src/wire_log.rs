use crate::consts::{MCPKIT_DIR_NAME, WIRE_LOG_DIR_NAME, WIRE_LOG_ENABLED, WIRE_LOG_ENV};
use crate::parent_process_id::parent_process_id;
use crate::wire_log_role::WireLogRole;
use serde_json::{Map, Value, json};
use std::fs::{OpenOptions, create_dir_all};
use std::io::Write;
use std::path::{Path, PathBuf};
use std::sync::Mutex;
use std::time::SystemTime;

/// Appends one JSON line per event to its own file, or does nothing when the env flag is off. A failed write is
/// reported once on stderr and turns the log off, so a full disk never stops serving.
pub struct WireLog {
    role: WireLogRole,
    file: Mutex<Option<PathBuf>>,
}

impl WireLog {
    pub fn disabled(role: WireLogRole) -> Self {
        WireLog {
            role,
            file: Mutex::new(None),
        }
    }

    pub fn from_env(role: WireLogRole) -> Self {
        let enabled = std::env::var(WIRE_LOG_ENV).is_ok_and(|value| value == WIRE_LOG_ENABLED);
        match std::env::home_dir() {
            Some(home) if enabled => WireLog::in_home(role, &home),
            _ => WireLog::disabled(role),
        }
    }

    pub fn in_home(role: WireLogRole, home: &Path) -> Self {
        let stamp = humantime::format_rfc3339_millis(SystemTime::now())
            .to_string()
            .replace([':', '.'], "-");
        let name = format!("{}-{}-{}.jsonl", role.as_str(), stamp, std::process::id());
        let log = WireLog {
            role,
            file: Mutex::new(Some(home.join(MCPKIT_DIR_NAME).join(WIRE_LOG_DIR_NAME).join(name))),
        };
        let exec_path = std::env::current_exe()
            .map(|path| path.display().to_string())
            .unwrap_or_default();
        let argv: Vec<String> = std::env::args().skip(1).collect();
        log.record("start", json!({ "execPath": exec_path, "argv": argv }));
        log
    }

    pub fn record(&self, event: &str, details: Value) {
        let Ok(mut file) = self.file.lock() else {
            return;
        };
        let Some(path) = file.as_ref() else {
            return;
        };
        let mut entry = Map::new();
        entry.insert(
            "time".into(),
            json!(humantime::format_rfc3339_millis(SystemTime::now()).to_string()),
        );
        entry.insert("role".into(), json!(self.role.as_str()));
        entry.insert("pid".into(), json!(std::process::id()));
        entry.insert("ppid".into(), json!(parent_process_id()));
        entry.insert("event".into(), json!(event));
        if let Value::Object(details) = details {
            entry.extend(details);
        }
        if let Err(error) = append_line(path, &Value::Object(entry).to_string()) {
            eprintln!("mcpkit: wire log {} turned off: {error}", path.display());
            *file = None;
        }
    }
}

fn append_line(path: &Path, line: &str) -> std::io::Result<()> {
    if let Some(directory) = path.parent() {
        create_dir_all(directory)?;
    }
    let mut file = OpenOptions::new().create(true).append(true).open(path)?;
    writeln!(file, "{line}")
}

#[cfg(test)]
mod tests {
    use super::WireLog;
    use crate::WireLogRole;
    use serde_json::{Value, json};

    #[test]
    fn writes_a_start_line_and_each_event() {
        let home = tempfile::tempdir().unwrap();
        let log = WireLog::in_home(WireLogRole::Supervisor, home.path());

        log.record("worker-exit", json!({ "code": 0, "current": true }));

        let directory = home.path().join(".mcpkit").join("logs");
        let file = std::fs::read_dir(&directory).unwrap().next().unwrap().unwrap().path();
        let lines: Vec<Value> = std::fs::read_to_string(file)
            .unwrap()
            .lines()
            .map(|line| serde_json::from_str(line).unwrap())
            .collect();
        assert_eq!(lines[0]["event"], json!("start"));
        assert_eq!(lines[1]["event"], json!("worker-exit"));
        assert_eq!(lines[1]["role"], json!("supervisor"));
        assert_eq!(lines[1]["current"], json!(true));
        assert_eq!(lines[1]["pid"], json!(std::process::id()));
    }

    #[test]
    fn writes_nothing_when_disabled() {
        WireLog::disabled(WireLogRole::Server).record("start", json!({}));
    }
}
