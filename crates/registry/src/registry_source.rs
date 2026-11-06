use crate::remote::EmbeddedRegistry;

/// Where a binary reads its manifests: the registry published for its version, or the one a dev binary carries.
#[derive(Clone, Copy, Debug)]
pub enum RegistrySource {
    Published,
    Embedded(EmbeddedRegistry),
}
