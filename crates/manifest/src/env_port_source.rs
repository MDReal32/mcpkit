use serde::{Deserialize, Serialize};

/// A port held by an environment variable of the calling process.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct EnvPortSource {
    pub name: String,
}
