use crate::consts::{CANNOT_IMPORT_MESSAGE, PENDING_TOKEN_VALUE};
use crate::token_import::token_import_plan::TokenImportPlan;
use mcpkit_auth::credentials::{CredentialRequest, validate_credential_response};
use mcpkit_auth::ui::resolve_cli_command;
use mcpkit_manifest::ui::UiAction;
use serde_json::{Map, Value, json};

/// Checks the import request against what the form offered before anything runs; the domain becomes a CLI argument.
pub fn prepare_token_import(request: &CredentialRequest, body: &Value) -> Result<TokenImportPlan, String> {
    let Some(body) = body.as_object() else {
        return Err("the import request must be a JSON object".to_owned());
    };
    let wanted = body.get("option").and_then(Value::as_f64);
    let option = request
        .options
        .iter()
        .find(|candidate| wanted == Some(candidate.index as f64));
    let action = body
        .get("action")
        .and_then(Value::as_f64)
        .filter(|index| index.fract() == 0.0 && *index >= 0.0)
        .and_then(|index| option?.actions.get(index as usize));
    let (Some(option), Some(UiAction::Cli { command, args, .. })) = (option, action) else {
        return Err(CANNOT_IMPORT_MESSAGE.to_owned());
    };
    let [field] = option.fields.as_slice() else {
        return Err(CANNOT_IMPORT_MESSAGE.to_owned());
    };
    let domain = match (&request.domain, body.get("domain").and_then(Value::as_str)) {
        (Some(_), Some(domain)) => Some(domain.trim().to_owned()),
        _ => None,
    };
    let mut candidate = Map::new();
    candidate.insert("method".to_owned(), json!("token"));
    candidate.insert("option".to_owned(), json!(option.index));
    candidate.insert("values".to_owned(), json!({ &field.key: PENDING_TOKEN_VALUE }));
    if let Some(domain) = &domain {
        candidate.insert("domain".to_owned(), json!(domain));
    }
    let errors = validate_credential_response(request, &Value::Object(candidate));
    if !errors.is_empty() {
        return Err(errors.join("; "));
    }
    let cli = resolve_cli_command(command, args, domain.as_deref().or(request.domain_in_use.as_deref()))
        .map_err(|error| error.0)?;
    Ok(TokenImportPlan {
        cli,
        option: option.index,
        key: field.key.clone(),
        domain,
    })
}
