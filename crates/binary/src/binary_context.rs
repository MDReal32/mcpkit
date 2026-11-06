use crate::binary_error::BinaryError;
use crate::binary_layout::BinaryLayout;
use crate::platform::{Target, detect_target};
use std::path::PathBuf;
use std::rc::Rc;
use usemcpkit_core::env::Env;
use usemcpkit_core::home::resolve_env_home_dir;
use usemcpkit_core::update::is_auto_update_enabled;
use usemcpkit_http::HttpClient;

/// What installing and updating read: the machine's target, the variables, the usemcpkit home, the running runner and
/// the client that reaches the npm registry.
#[derive(Clone)]
pub struct BinaryContext {
    pub target: Target,
    pub env: Env,
    pub home_dir: PathBuf,
    /// The runner binary of this process; tests point it anywhere.
    pub exec_path: PathBuf,
    pub http: Rc<dyn HttpClient>,
    pub layout: BinaryLayout,
}

impl BinaryContext {
    pub fn new(target: Target, env: Env, exec_path: PathBuf, http: Rc<dyn HttpClient>) -> Result<Self, BinaryError> {
        let home_dir = resolve_env_home_dir(&env).map_err(BinaryError)?;
        Ok(BinaryContext {
            target,
            env,
            home_dir,
            exec_path,
            http,
            layout: BinaryLayout::Pair,
        })
    }

    /// A release updates itself unless `USEMCPKIT_AUTOUPDATE` is `0`; a dev build never does.
    pub fn updates_itself(&self) -> bool {
        self.layout == BinaryLayout::Pair && is_auto_update_enabled(&self.env)
    }

    /// The context of this process: the target it was built for and the running executable.
    pub fn current(env: Env, http: Rc<dyn HttpClient>) -> Result<Self, BinaryError> {
        let target = detect_target().ok_or_else(|| {
            BinaryError(format!(
                "no usemcpkit binary is built for {}-{}",
                std::env::consts::OS,
                std::env::consts::ARCH
            ))
        })?;
        let exec_path = std::env::current_exe()
            .map_err(|error| BinaryError(format!("cannot find the running usemcpkit binary: {error}")))?;
        BinaryContext::new(target, env, exec_path, http)
    }
}
