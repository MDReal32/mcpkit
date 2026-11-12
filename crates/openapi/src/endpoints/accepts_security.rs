use crate::document::SpecDocument;
use crate::endpoints::Endpoint;
use serde_json::Value;

/// Whether the endpoint's `security` (its own, else the document's) can be met by one of the schemes the manifest's
/// auth satisfies; an empty requirement means no auth is needed.
pub fn accepts_security(document: &SpecDocument, endpoint: &Endpoint, accepted: &[String]) -> bool {
    let requirements = endpoint
        .operation
        .get("security")
        .or_else(|| document.root.get("security"))
        .and_then(Value::as_array);
    let Some(requirements) = requirements.filter(|requirements| !requirements.is_empty()) else {
        return true;
    };
    requirements.iter().any(|requirement| match requirement.as_object() {
        Some(schemes) => schemes.is_empty() || schemes.keys().any(|scheme| accepted.contains(scheme)),
        None => false,
    })
}
