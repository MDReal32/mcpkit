use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(tag = "type", rename_all = "lowercase")]
pub enum UiAction {
    /// Opens `url` in a new tab; `{domain}`, `{webHost}` and `{server}` are filled in.
    Link { label: String, url: String },
    /// Takes the token from a local CLI, run without a shell only when clicked; `args` may use `{domain}` and `{webHost}`.
    Cli {
        label: String,
        command: String,
        args: Vec<String>,
    },
}
