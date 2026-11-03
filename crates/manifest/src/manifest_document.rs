use crate::Manifest;
use crate::registry::ManifestPart;
use serde_json::Value;

/// A manifest file of the registry: a whole manifest, or a shell whose tools are split into `parts`, one per group.
#[derive(Clone, Debug, PartialEq)]
pub struct ManifestDocument {
    pub manifest: Manifest,
    pub parts: Option<Vec<ManifestPart>>,
}

impl ManifestDocument {
    pub fn from_json(text: &str) -> serde_json::Result<Self> {
        let mut data: Value = serde_json::from_str(text)?;
        let parts = match data.as_object_mut().and_then(|object| object.remove("parts")) {
            Some(parts) => Some(serde_json::from_value(parts)?),
            None => None,
        };
        Ok(ManifestDocument {
            manifest: serde_json::from_value(data)?,
            parts,
        })
    }

    pub fn is_shell(&self) -> bool {
        self.parts.is_some()
    }
}
