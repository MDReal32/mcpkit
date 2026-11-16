use crate::ServerKey;
use crate::consts::SERVERS_KEY;
use serde_json::{Map, Value};

pub fn read_server_config<'a>(config: &'a Map<String, Value>, server: &ServerKey) -> Option<&'a Map<String, Value>> {
    config
        .get(SERVERS_KEY)?
        .get(&server.category)?
        .get(&server.name)?
        .as_object()
}
