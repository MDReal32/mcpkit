use crate::CallContext;
use crate::ToolError;
use crate::args::ToolArgs;
use crate::auth_fallback::accepted_auth_attempt::AcceptedAuthAttempt;
use crate::auth_fallback::auth_attempt::AuthAttempt;
use crate::auth_fallback::auth_candidate::AuthCandidate;
use crate::consts::HTTP_UNAUTHORIZED;
use crate::request::build_request;
use crate::response::{read_api_error_message, read_response_body};
use mcpkit_manifest::tool::ToolSpec;

/// A candidate fails when its credentials are unavailable (unset env var, no stored token) or the API answers 401; a
/// request that cannot be built or sent fails the whole call.
pub async fn attempt_auth(
    candidate: AuthCandidate<'_>,
    tool: &ToolSpec,
    args: &ToolArgs,
    context: &CallContext,
) -> Result<AuthAttempt, ToolError> {
    let resolution = match (candidate.resolve)().await {
        Ok(resolution) => resolution,
        Err(error) => return Ok(AuthAttempt::Rejected(error.0)),
    };
    let sent_tool = resolution
        .manifest
        .tools
        .iter()
        .find(|candidate| candidate.name == tool.name)
        .unwrap_or(tool)
        .clone();
    let request = build_request(&resolution.manifest, &sent_tool, args, &resolution.auth)?;
    let response = context
        .auth
        .http
        .send(&request, context.timeout)
        .await
        .map_err(|error| ToolError(error.0))?;
    if response.status == HTTP_UNAUTHORIZED {
        let message = read_api_error_message(&read_response_body(&response)?);
        let reason = [format!("API answered {HTTP_UNAUTHORIZED}"), message]
            .into_iter()
            .filter(|part| !part.is_empty())
            .collect::<Vec<_>>()
            .join(": ");
        return Ok(AuthAttempt::Rejected(reason));
    }
    Ok(AuthAttempt::Accepted(Box::new(AcceptedAuthAttempt {
        response,
        tool: sent_tool,
    })))
}
