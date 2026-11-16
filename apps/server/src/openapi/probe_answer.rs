use serde_json::Value;

/// How the server answered the probe, and the host it went to.
pub struct ProbeAnswer {
    pub domain: Option<String>,
    pub status: u16,
    /// The JSON body of a successful answer.
    pub body: Option<Value>,
}
