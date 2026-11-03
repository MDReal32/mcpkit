use crate::ServerKey;
use serde_json::{Map, Value};

pub fn read_server_config<'a>(config: &'a Map<String, Value>, server: &ServerKey) -> Option<&'a Map<String, Value>> {
    config
        .get("servers")?
        .get(&server.category)?
        .get(&server.name)?
        .as_object()
}
