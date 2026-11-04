use napi_derive::napi;
use serde_json::Value;

/// Whether the manifest has no validation error.
#[napi(ts_args_type = "manifest: unknown")]
pub fn is_valid_manifest(manifest: Option<Value>) -> bool {
    usemcpkit_validation::is_valid_manifest(&manifest.unwrap_or(Value::Null))
}
