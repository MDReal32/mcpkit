use usemcpkit_http::HttpResponse;
use usemcpkit_manifest::tool::ToolSpec;

#[derive(Clone, Debug, PartialEq)]
pub struct AcceptedAuthAttempt {
    pub response: HttpResponse,
    /// The tool as sent: its request and response mapping follow the edition of the domain that was used.
    pub tool: ToolSpec,
}
