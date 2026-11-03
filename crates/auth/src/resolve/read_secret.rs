use crate::AuthError;
use mcpkit_core::env::Env;

pub fn read_secret(env: &Env, env_name: &str, server_name: &str) -> Result<String, AuthError> {
    env.get_non_empty(env_name).map(str::to_owned).ok_or_else(|| {
        AuthError(format!(
            "{server_name}: missing credential, set the {env_name} environment variable or enter it in the credentials form"
        ))
    })
}
