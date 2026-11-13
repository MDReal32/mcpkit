use crate::openapi::build_probe_manifest::build_probe_manifest;
use crate::openapi::probe_answer::ProbeAnswer;
use usemcpkit_execution::CallContext;
use usemcpkit_execution::args::ToolArgs;
use usemcpkit_execution::auth_fallback::send_with_auth_fallback;
use usemcpkit_execution::response::read_response_body;
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::openapi::OpenApiSource;

/// Signs in to the server the way a tool call does (saved credentials, then the credentials form, which also asks for
/// the host when none is known) and sends the probe of the source matching the host.
pub async fn probe_server(
    manifest: &Manifest,
    sources: &[OpenApiSource],
    calls: &CallContext,
) -> Result<ProbeAnswer, String> {
    let probe_manifest = build_probe_manifest(manifest, sources)?;
    let Some(probe) = probe_manifest.tools.first() else {
        return Err("the probe manifest has no probe".to_owned());
    };
    let accepted = send_with_auth_fallback(&probe_manifest, probe, &ToolArgs::new(), calls)
        .await
        .map_err(|error| error.0)?;
    let body = if accepted.response.is_ok() {
        Some(read_response_body(&accepted.response).map_err(|error| error.0)?)
    } else {
        None
    };
    Ok(ProbeAnswer {
        domain: accepted.domain,
        status: accepted.response.status,
        body,
    })
}
