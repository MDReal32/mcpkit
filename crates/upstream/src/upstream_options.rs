use crate::current_time_millis::current_time_millis;
use crate::warn_on_stderr::warn_on_stderr;
use indexmap::IndexMap;
use std::path::PathBuf;
use std::rc::Rc;
use usemcpkit_core::env::Env;
use usemcpkit_http::HttpClient;

#[derive(Clone)]
pub struct UpstreamOptions {
    /// Request headers of an HTTP upstream, already signed by the manifest's auth.
    pub headers: IndexMap<String, String>,
    /// Environment of a stdio upstream's child, on top of the few variables taken from `process_env`.
    pub env: IndexMap<String, String>,
    /// usemcpkit's own environment: where children's `PATH` and the other forwarded variables come from.
    pub process_env: Env,
    /// Where a stdio upstream that runs from a repository keeps its clone; cloned there on first use.
    pub repo_dir: Option<PathBuf>,
    /// Whether a clone at a branch or tag is compared with its remote and updated when it moved.
    pub check_repo: bool,
    /// Where non-fatal problems, such as a failed update check, are reported.
    pub warn: Rc<dyn Fn(&str)>,
    /// Epoch milliseconds, for the clone's marker.
    pub now: Rc<dyn Fn() -> u64>,
    pub http: Rc<dyn HttpClient>,
    pub client_version: String,
}

impl UpstreamOptions {
    /// No headers or credentials, repository checks on, warnings to stderr and the system clock.
    pub fn new(http: Rc<dyn HttpClient>, process_env: Env) -> Self {
        UpstreamOptions {
            headers: IndexMap::new(),
            env: IndexMap::new(),
            process_env,
            repo_dir: None,
            check_repo: true,
            warn: Rc::new(warn_on_stderr),
            now: Rc::new(current_time_millis),
            http,
            client_version: "0.0.0".to_owned(),
        }
    }
}
