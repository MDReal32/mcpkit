use usemcpkit_core::env::Env;
use usemcpkit_manifest::openapi::OpenApiSource;

/// The version the source's env var sets, which wins over the one the server answers.
pub fn read_version_override(source: &OpenApiSource, env: &Env) -> Option<String> {
    let name = source.version.as_ref()?.env.as_deref()?;
    env.get_non_empty(name).map(str::to_owned)
}
