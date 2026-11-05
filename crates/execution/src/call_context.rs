use crate::ExecutorState;
use std::rc::Rc;
use std::time::Duration;
use usemcpkit_auth::AuthContext;

/// Everything a tool call reads besides its manifest and arguments.
#[derive(Clone)]
pub struct CallContext {
    pub auth: AuthContext,
    /// How long one API request may take.
    pub timeout: Duration,
    pub state: Rc<ExecutorState>,
}
