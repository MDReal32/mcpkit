use serde_json::{Map, Value};
use usemcpkit_auth::ResolvedAuth;
use usemcpkit_auth::credentials::read_answer_values;
use usemcpkit_auth::resolve::resolve_static_auth;
use usemcpkit_core::env::Env;
use usemcpkit_manifest::Manifest;

/// The auth of the option the page has picked, once every one of its fields is typed; `None` before that, so the
/// check goes out without credentials.
pub fn read_typed_auth(manifest: &Manifest, body: &Map<String, Value>) -> Result<Option<ResolvedAuth>, String> {
    let Some(index) = body.get("option").and_then(Value::as_u64) else {
        return Ok(None);
    };
    let auth = usize::try_from(index)
        .ok()
        .and_then(|index| manifest.auth.as_ref()?.get(index))
        .filter(|auth| !auth.is_interactive())
        .ok_or_else(|| format!("auth[{index}] does not take credentials"))?;
    let values = read_answer_values(body);
    let typed = auth
        .env_names()
        .iter()
        .all(|name| values.get(*name).is_some_and(|value| !value.is_empty()));
    if !typed {
        return Ok(None);
    }
    resolve_static_auth(auth, &manifest.name, &Env::from_pairs(values))
        .map(Some)
        .map_err(|error| error.0)
}
