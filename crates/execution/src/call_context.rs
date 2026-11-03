use crate::ExecutorState;
use mcpkit_auth::AuthContext;
use std::rc::Rc;
use std::time::Duration;

/// Everything a tool call reads besides its manifest and arguments.
#[derive(Clone)]
pub struct CallContext {
    pub auth: AuthContext,
    /// How long one API request may take.
    pub timeout: Duration,
    pub state: Rc<ExecutorState>,
}
