use crate::OpenApiError;
use crate::document::{SpecDocument, reference_of};
use serde_json::Value;

/// What a schema node is once its references are followed; `None` when one of them is already being converted
/// (`chain`), which keeps a recursive schema finite.
pub fn resolve_schema<'a>(
    document: &SpecDocument<'a>,
    node: &'a Value,
    chain: &[String],
) -> Result<Option<&'a Value>, OpenApiError> {
    let mut current = node;
    let mut followed: Vec<&str> = Vec::new();
    while let Some(reference) = reference_of(current) {
        if chain.iter().any(|seen| seen == reference) || followed.contains(&reference) {
            return Ok(None);
        }
        followed.push(reference);
        current = document.pointer(reference)?;
    }
    Ok(Some(current))
}
