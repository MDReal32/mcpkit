use crate::supervisor::consts::{INITIALIZE_METHOD, INITIALIZED_METHOD};
use crate::supervisor::line_header::read_line_header;

/// The client's own handshake lines, replayed to every replacement server so it starts in the same session.
#[derive(Clone, Debug, Default, PartialEq)]
pub struct HandshakeRecord {
    pub initialize: Option<String>,
    pub initialized: Option<String>,
}

impl HandshakeRecord {
    pub fn record_line(&mut self, line: &str) {
        match read_line_header(line).method.as_deref() {
            Some(INITIALIZE_METHOD) => {
                *self = HandshakeRecord {
                    initialize: Some(line.to_string()),
                    initialized: None,
                };
            }
            Some(INITIALIZED_METHOD) => self.initialized = Some(line.to_string()),
            _ => {}
        }
    }
}

#[cfg(test)]
mod tests {
    use super::HandshakeRecord;

    #[test]
    fn keeps_the_latest_initialize_and_its_initialized() {
        let mut record = HandshakeRecord::default();
        record.record_line(r#"{"id":1,"method":"initialize"}"#);
        record.record_line(r#"{"method":"notifications/initialized"}"#);
        record.record_line(r#"{"id":2,"method":"tools/list"}"#);

        assert_eq!(record.initialize.as_deref(), Some(r#"{"id":1,"method":"initialize"}"#));
        assert_eq!(
            record.initialized.as_deref(),
            Some(r#"{"method":"notifications/initialized"}"#)
        );

        record.record_line(r#"{"id":3,"method":"initialize"}"#);
        assert_eq!(record.initialized, None);
    }
}
