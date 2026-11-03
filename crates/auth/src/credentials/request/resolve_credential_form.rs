use crate::credentials::request::load_credential_request::load_credential_request;
use crate::credentials::request::request_credentials_once::request_credentials_once;
use crate::credentials::resolve::{resolve_form_sign_in, resolve_form_token};
use crate::credentials::response::validate_credential_response;
use crate::{AuthContext, AuthError, AuthResolution};
use mcpkit_manifest::Manifest;
use mcpkit_manifest::domain::apply_domain;
use serde_json::Value;
use std::rc::Rc;

/// Asks the user for a domain and credentials, or to sign in; what they enter is saved once the API accepts it.
pub async fn resolve_credential_form(
    manifest: &Rc<Manifest>,
    domain: Option<&str>,
    context: &AuthContext,
) -> Result<AuthResolution, AuthError> {
    let Some(requester) = &context.request_credentials else {
        return Err(AuthError(format!(
            "{}: asking for credentials needs a form, which this caller does not provide",
            manifest.name
        )));
    };
    let create_request = Box::pin(load_credential_request(
        Rc::clone(manifest),
        domain.map(str::to_owned),
        context.clone(),
    ));
    let exchange = request_credentials_once(&manifest.name, create_request, context, requester).await?;
    let errors = validate_credential_response(&exchange.request, &exchange.response);
    if !errors.is_empty() {
        return Err(AuthError(format!(
            "{}: invalid credentials form answer: {}",
            manifest.name,
            errors.join("; ")
        )));
    }
    let answer = exchange.response.as_object().cloned().unwrap_or_default();
    let chosen = answer
        .get("domain")
        .and_then(Value::as_str)
        .or(domain)
        .map(str::to_owned);
    let target = Rc::new(apply_domain(manifest, chosen.as_deref()));
    match answer.get("method").and_then(Value::as_str) {
        Some("sign-in") => resolve_form_sign_in(target, chosen, context).await,
        _ => resolve_form_token(target, &answer, chosen),
    }
}
