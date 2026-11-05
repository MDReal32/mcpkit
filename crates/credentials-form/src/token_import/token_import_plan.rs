use usemcpkit_auth::ui::CliTokenCommand;

/// What a checked import request runs and which answer the token completes.
#[derive(Clone, Debug, PartialEq)]
pub struct TokenImportPlan {
    pub cli: CliTokenCommand,
    pub option: usize,
    /// The field the imported token fills.
    pub key: String,
    pub domain: Option<String>,
}
