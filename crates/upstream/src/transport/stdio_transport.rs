use crate::transport::create_child_env::create_child_env;
use crate::transport::create_json_rpc_message::create_json_rpc_message;
use crate::transport::mcp_transport::McpTransport;
use crate::transport::pending_requests::PendingRequests;
use crate::transport::read_until_exit::read_until_exit;
use crate::upstream_error::UpstreamError;
use crate::upstream_options::UpstreamOptions;
use serde_json::Value;
use std::process::Stdio;
use std::sync::{Arc, PoisonError};
use tokio::io::AsyncWriteExt;
use tokio::process::{ChildStdin, Command};
use tokio::sync::oneshot;
use usemcpkit_core::LocalFuture;
use usemcpkit_core::env::Env;
use usemcpkit_core::js::to_js_json;
use usemcpkit_core::program::find_program;
use usemcpkit_manifest::upstream::StdioUpstream;

/// A child started without a shell, spoken to one JSON line at a time. One task reads its stdout and owns the child:
/// when the child exits, every waiting request fails with the exit code; `close` (or dropping the transport) kills it.
pub struct StdioTransport {
    stdin: tokio::sync::Mutex<Option<ChildStdin>>,
    pending: Arc<PendingRequests>,
    kill: std::sync::Mutex<Option<oneshot::Sender<()>>>,
}

impl StdioTransport {
    pub fn start(spec: &StdioUpstream, options: &UpstreamOptions) -> Result<Self, UpstreamError> {
        let command = &spec.command;
        let child_env = create_child_env(&options.process_env, &options.env);
        let could_not_start = |reason: String| UpstreamError::new(format!("could not start \"{command}\": {reason}"));
        let program = find_program(command, &Env::from_pairs(child_env.clone()))
            .map_err(|error| could_not_start(error.to_string()))?
            .ok_or_else(|| could_not_start("it is not installed or not on PATH".to_owned()))?;
        let mut spawning = Command::new(program);
        spawning
            .args(spec.args.iter().flatten())
            .env_clear()
            .envs(child_env)
            .stdin(Stdio::piped())
            .stdout(Stdio::piped())
            .stderr(Stdio::null())
            .kill_on_drop(true);
        #[cfg(windows)]
        spawning.creation_flags(usemcpkit_core::program::CREATE_NO_WINDOW);
        let mut child = spawning.spawn().map_err(|error| could_not_start(error.to_string()))?;
        let (Some(stdin), Some(stdout)) = (child.stdin.take(), child.stdout.take()) else {
            return Err(could_not_start("its stdio was not piped".to_owned()));
        };
        let pending = Arc::new(PendingRequests::new());
        let (kill, killed) = oneshot::channel();
        tokio::spawn(read_until_exit(
            command.clone(),
            child,
            stdout,
            Arc::clone(&pending),
            killed,
        ));
        Ok(StdioTransport {
            stdin: tokio::sync::Mutex::new(Some(stdin)),
            pending,
            kill: std::sync::Mutex::new(Some(kill)),
        })
    }

    /// Writes one whole line under the lock, so concurrent requests never interleave on the pipe.
    async fn send(&self, message: &Value) -> Result<(), UpstreamError> {
        let line = format!("{}\n", to_js_json(message));
        let mut stdin = self.stdin.lock().await;
        let Some(pipe) = stdin.as_mut() else {
            return Err(UpstreamError::new("the upstream connection is closed"));
        };
        let written = match pipe.write_all(line.as_bytes()).await {
            Ok(()) => pipe.flush().await,
            Err(error) => Err(error),
        };
        written.map_err(|error| UpstreamError::new(error.to_string()))
    }

    async fn send_request(&self, method: &str, params: Option<Value>) -> Result<Value, UpstreamError> {
        let (id, reply) = self.pending.open()?;
        if let Err(error) = self.send(&create_json_rpc_message(Some(id), method, params)).await {
            self.pending.forget(id);
            return Err(error);
        }
        self.pending.wait(id, reply).await
    }

    async fn shut_down(&self) {
        self.stdin.lock().await.take();
        let kill = self.kill.lock().unwrap_or_else(PoisonError::into_inner).take();
        if let Some(kill) = kill {
            let _already_exited = kill.send(());
        }
    }
}

impl McpTransport for StdioTransport {
    fn request<'a>(&'a self, method: &'a str, params: Option<Value>) -> LocalFuture<'a, Result<Value, UpstreamError>> {
        Box::pin(self.send_request(method, params))
    }

    fn notify<'a>(&'a self, method: &'a str, params: Option<Value>) -> LocalFuture<'a, Result<(), UpstreamError>> {
        Box::pin(async move { self.send(&create_json_rpc_message(None, method, params)).await })
    }

    fn is_open(&self) -> bool {
        self.pending.is_open()
    }

    fn close(&self) -> LocalFuture<'_, ()> {
        Box::pin(self.shut_down())
    }
}
