use crate::consts::FORWARDED_ENV_NAMES;
use indexmap::IndexMap;
use mcpkit_core::env::Env;

/// The whole environment of a child: the forwarded variables of mcpkit's own environment, then `env` on top.
pub fn create_child_env(process_env: &Env, env: &IndexMap<String, String>) -> IndexMap<String, String> {
    let mut child_env: IndexMap<String, String> = FORWARDED_ENV_NAMES
        .iter()
        .filter_map(|name| Some(((*name).to_owned(), process_env.get(name)?.to_owned())))
        .collect();
    child_env.extend(env.iter().map(|(name, value)| (name.clone(), value.clone())));
    child_env
}
