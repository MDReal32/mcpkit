use crate::domain::parse_port::parse_port;
use usemcpkit_core::env::Env;
use usemcpkit_manifest::EnvPortSource;

pub fn read_env_port(source: &EnvPortSource, env: &Env) -> Option<u16> {
    env.get_non_empty(&source.name).and_then(parse_port)
}
