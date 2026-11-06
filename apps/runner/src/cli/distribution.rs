use usemcpkit_binary::BinaryLayout;
use usemcpkit_registry::{EmbeddedRegistry, RegistrySource};

/// What a build carries: a release reads the registry published for its version and runs the server next to it; a dev
/// build reads the manifests compiled into it and is its own server.
#[derive(Clone, Copy, Debug)]
pub struct Distribution {
    pub registry: RegistrySource,
    pub layout: BinaryLayout,
}

impl Distribution {
    pub const RELEASE: Distribution = Distribution {
        registry: RegistrySource::Published,
        layout: BinaryLayout::Pair,
    };

    pub const fn dev(registry: EmbeddedRegistry) -> Self {
        Distribution {
            registry: RegistrySource::Embedded(registry),
            layout: BinaryLayout::Combined,
        }
    }
}
