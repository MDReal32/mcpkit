use crate::OpenApiError;
use crate::version::capture_version::capture_version;
use crate::version::read_json_path::read_json_path;
use serde_json::Value;
use usemcpkit_manifest::openapi::VersionProbe;

/// The version a server's answer to the probe holds.
pub fn read_version(answer: &Value, probe: &VersionProbe) -> Result<String, OpenApiError> {
    let text = match read_json_path(answer, &probe.field) {
        Some(Value::String(text)) => text.clone(),
        Some(Value::Number(number)) => number.to_string(),
        _ => {
            return Err(OpenApiError(format!(
                "{} answered without a \"{}\" field",
                probe.path, probe.field
            )));
        }
    };
    capture_version(&probe.pattern, &text)?.ok_or_else(|| {
        OpenApiError(format!(
            "{} answered version \"{text}\", which \"{}\" does not match",
            probe.path, probe.pattern
        ))
    })
}
