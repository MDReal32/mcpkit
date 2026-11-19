use std::fmt::{Display, Formatter};
use usemcpkit_manifest::Manifest;

/// Where a server's settings live in the config: `servers.<category>.<name>`.
#[derive(Clone, Debug, PartialEq, Eq, Hash)]
pub struct ServerKey {
    pub category: String,
    pub name: String,
}

impl ServerKey {
    pub fn new(category: &str, name: &str) -> Self {
        ServerKey {
            category: category.to_owned(),
            name: name.to_owned(),
        }
    }

    pub fn of(manifest: &Manifest) -> Self {
        ServerKey::new(&manifest.category, &manifest.name)
    }
}

impl Display for ServerKey {
    fn fmt(&self, formatter: &mut Formatter<'_>) -> std::fmt::Result {
        write!(formatter, "{}:{}", self.category, self.name)
    }
}
