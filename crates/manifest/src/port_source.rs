use crate::env_port_source::EnvPortSource;
use crate::log_port_source::LogPortSource;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(tag = "type", rename_all = "lowercase")]
pub enum PortSource {
    Env(EnvPortSource),
    Log(LogPortSource),
}
