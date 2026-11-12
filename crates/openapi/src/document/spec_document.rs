use crate::OpenApiError;
use crate::document::reference_of;
use serde_json::Value;

/// An OpenAPI 3 document, read in place: references are followed when a node is used, never inlined.
pub struct SpecDocument<'a> {
    pub root: &'a Value,
}

impl<'a> SpecDocument<'a> {
    pub fn new(root: &'a Value) -> Self {
        SpecDocument { root }
    }

    /// The node a local reference such as `#/components/schemas/Issue` points at.
    pub fn pointer(&self, reference: &str) -> Result<&'a Value, OpenApiError> {
        let Some(pointer) = reference.strip_prefix('#') else {
            return Err(OpenApiError(format!(
                "unsupported $ref \"{reference}\", only local references are resolved"
            )));
        };
        self.root
            .pointer(pointer)
            .ok_or_else(|| OpenApiError(format!("$ref \"{reference}\" does not resolve")))
    }

    /// `node`, or what its chain of references ends at.
    pub fn resolve(&self, node: &'a Value) -> Result<&'a Value, OpenApiError> {
        let mut current = node;
        let mut seen = Vec::new();
        while let Some(reference) = reference_of(current) {
            if seen.contains(&reference) {
                return Err(OpenApiError(format!("$ref \"{reference}\" points at itself")));
            }
            seen.push(reference);
            current = self.pointer(reference)?;
        }
        Ok(current)
    }
}
