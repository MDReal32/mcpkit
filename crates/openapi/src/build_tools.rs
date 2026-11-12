use crate::document::{SpecDocument, read_base_path};
use crate::endpoints::{SkipDecision, collect_endpoints, find_skip_reason};
use crate::naming::name_endpoints;
use crate::schema::Conversion;
use crate::tool::build_tool;
use crate::{BuiltTools, OpenApiError};
use indexmap::IndexMap;
use serde_json::Value;
use usemcpkit_manifest::openapi::OpenApiSource;

/// The tools of an OpenAPI 3 document (see [`crate::document::parse_document`]) for one source of a manifest, sorted
/// by name, and the endpoints that could not become tools.
pub fn build_tools(
    document: &Value,
    source: &OpenApiSource,
    naming: &IndexMap<String, String>,
) -> Result<BuiltTools, OpenApiError> {
    let conversion = Conversion::from_options(source.options.as_ref())?;
    let document = SpecDocument::new(document);
    let base_path = source
        .base_path
        .clone()
        .unwrap_or_else(|| read_base_path(document.root));
    let mut kept = Vec::new();
    let mut skipped = Vec::new();
    for endpoint in collect_endpoints(&document, &base_path)? {
        match find_skip_reason(&document, &endpoint, &conversion)? {
            SkipDecision::Keep => kept.push(endpoint),
            SkipDecision::Excluded => {}
            SkipDecision::Unsupported(reason) => skipped.push(format!("{}: {reason}", endpoint.subject())),
        }
    }
    let names = name_endpoints(&kept, naming)?;
    let mut tools = Vec::with_capacity(kept.len());
    for (endpoint, name) in kept.iter().zip(names) {
        tools.push(build_tool(&document, endpoint, name, &conversion)?);
    }
    tools.sort_by(|left, right| left.name.cmp(&right.name));
    Ok(BuiltTools { tools, skipped })
}
