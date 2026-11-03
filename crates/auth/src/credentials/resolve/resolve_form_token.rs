use crate::credentials::FormAnswer;
use crate::credentials::response::read_answer_values;
use crate::resolve::resolve_static_auth;
use crate::{AuthError, AuthResolution};
use mcpkit_core::env::Env;
use mcpkit_manifest::Manifest;
use serde_json::{Map, Value};
use std::rc::Rc;

/// The credentials typed into the form for the chosen fallback entry, saved once the API accepts them.
pub fn resolve_form_token(
    manifest: Rc<Manifest>,
    response: &Map<String, Value>,
    domain: Option<String>,
) -> Result<AuthResolution, AuthError> {
    let option = response.get("option").and_then(Value::as_u64).unwrap_or_default();
    let auth = usize::try_from(option)
        .ok()
        .and_then(|index| manifest.auth.as_ref()?.get(index))
        .filter(|auth| !auth.is_interactive())
        .ok_or_else(|| AuthError(format!("{}: auth[{option}] does not take credentials", manifest.name)))?;
    let values = read_answer_values(response);
    let resolved = resolve_static_auth(auth, &manifest.name, &Env::from_pairs(values.clone()))?;
    Ok(AuthResolution {
        auth: resolved,
        save: Some(FormAnswer { values, domain }),
        manifest,
    })
}
