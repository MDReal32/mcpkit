use crate::OpenApiError;
use crate::body::find_body_reason;
use crate::consts::EXECUTOR_HEADERS;
use crate::document::SpecDocument;
use crate::endpoints::accepts_security::accepts_security;
use crate::endpoints::{Endpoint, SkipDecision};
use crate::schema::Conversion;
use serde_json::Value;

/// Why an endpoint does not become a tool, if it does not.
pub fn find_skip_reason(
    document: &SpecDocument,
    endpoint: &Endpoint,
    conversion: &Conversion,
) -> Result<SkipDecision, OpenApiError> {
    let subject = endpoint.subject();
    if conversion.skip.iter().any(|pattern| pattern.is_match(&subject)) {
        return Ok(SkipDecision::Excluded);
    }
    let deprecated = endpoint.operation.get("deprecated").and_then(Value::as_bool) == Some(true);
    if deprecated && conversion.skip_deprecated {
        return Ok(SkipDecision::Excluded);
    }
    if let Some(accepted) = &conversion.security
        && !accepts_security(document, endpoint, accepted)
    {
        return Ok(SkipDecision::Unsupported(
            "needs a security scheme the server's auth does not provide".to_owned(),
        ));
    }
    let required_header = endpoint.parameters.iter().find(|parameter| {
        parameter.location == "header"
            && parameter.required
            && !EXECUTOR_HEADERS.contains(&parameter.name.to_ascii_lowercase().as_str())
            && !parameter
                .schema
                .and_then(|schema| schema.get("default"))
                .is_some_and(Value::is_string)
    });
    if let Some(header) = required_header {
        return Ok(SkipDecision::Unsupported(format!(
            "requires the {} header, header parameters are not supported",
            header.name
        )));
    }
    match find_body_reason(document, endpoint, conversion)? {
        Some(reason) => Ok(SkipDecision::Unsupported(reason)),
        None => Ok(SkipDecision::Keep),
    }
}
