use napi_derive::napi;
use serde_json::Value;

/// Every error of the manifest, empty when it is valid. `undefined` is not a JSON object like `null`, and a property
/// set to `undefined` is left out as `JSON.stringify` does; a value JSON cannot hold (a function, a bigint) throws.
#[napi(ts_args_type = "manifest: unknown")]
pub fn validate_manifest(manifest: Option<Value>) -> Vec<String> {
    usemcpkit_validation::validate_manifest(&manifest.unwrap_or(Value::Null))
}
