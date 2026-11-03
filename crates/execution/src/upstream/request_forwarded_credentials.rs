use crate::upstream::consts::FORWARDED_OPTION_INDEX;
use indexmap::IndexMap;
use mcpkit_auth::credentials::{
    CredentialOption, CredentialRequest, CredentialRequester, read_answer_values, request_credentials_once,
    to_credential_field, validate_credential_response,
};
use mcpkit_auth::ui::{build_ui_texts, to_option_actions};
use mcpkit_auth::{AuthContext, AuthError};
use mcpkit_manifest::Manifest;
use mcpkit_manifest::upstream::StdioUpstream;
use serde_json::Value;

/// Asks the user in the credentials form for `names`, the credentials of a stdio upstream that nothing provided.
pub async fn request_forwarded_credentials(
    manifest: &Manifest,
    upstream: &StdioUpstream,
    names: &[String],
    context: &AuthContext,
    requester: &CredentialRequester,
) -> Result<IndexMap<String, String>, AuthError> {
    let texts = build_ui_texts(manifest);
    let inputs = upstream.ui.as_ref().and_then(|ui| ui.inputs.as_ref());
    let fields: Vec<_> = names
        .iter()
        .map(|name| {
            to_credential_field(
                name,
                name.clone(),
                true,
                &texts,
                inputs.and_then(|inputs| inputs.get(name)),
            )
        })
        .collect();
    let option = CredentialOption {
        index: FORWARDED_OPTION_INDEX,
        label: texts.get("credentialLegend").cloned().unwrap_or_default(),
        actions: to_option_actions(upstream.ui.as_ref(), &manifest.name, fields.len()),
        fields,
    };
    let request = CredentialRequest {
        server_name: manifest.name.clone(),
        texts,
        domain: None,
        domain_in_use: None,
        options: vec![option],
        sign_in: false,
    };
    let exchange =
        request_credentials_once(&manifest.name, Box::pin(async move { Ok(request) }), context, requester).await?;
    let errors = validate_credential_response(&exchange.request, &exchange.response);
    let answer = exchange.response.as_object().cloned().unwrap_or_default();
    if !errors.is_empty() || answer.get("method").and_then(Value::as_str) != Some("token") {
        return Err(AuthError(format!(
            "{}: invalid credentials form answer: {}",
            manifest.name,
            errors.join("; ")
        )));
    }
    Ok(read_answer_values(&answer))
}
