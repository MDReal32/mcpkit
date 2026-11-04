use crate::consts::{DEFAULT_NPM_REGISTRY, NPM_REGISTRY_ENV};
use mcpkit_core::env::Env;

pub fn resolve_npm_registry(env: &Env) -> String {
    env.get(NPM_REGISTRY_ENV)
        .unwrap_or(DEFAULT_NPM_REGISTRY)
        .trim_end_matches('/')
        .to_owned()
}
