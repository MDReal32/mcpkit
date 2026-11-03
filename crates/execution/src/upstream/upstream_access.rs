use indexmap::IndexMap;
use mcpkit_manifest::upstream::UpstreamSpec;

/// What one attempt at an upstream is made with: its spec with the domain filled in, the auth headers of an HTTP one
/// and the forwarded credentials of a stdio one.
#[derive(Clone, Debug, PartialEq)]
pub struct UpstreamAccess {
    pub upstream: UpstreamSpec,
    pub headers: IndexMap<String, String>,
    pub env: IndexMap<String, String>,
}
