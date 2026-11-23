use crate::openapi::consts::NOT_FOUND_STATUS;
use crate::openapi::probe_answer::ProbeAnswer;
use usemcpkit_manifest::openapi::SpecVersioning;
use usemcpkit_openapi::version::read_version;

/// The version in the server's answer to the probe; `None` when the probe path does not exist (a 404) on a source that
/// falls back to its oldest document, since a server that old has no such path.
pub fn read_probed_version(
    answer: Option<&ProbeAnswer>,
    versioning: &SpecVersioning,
) -> Result<Option<String>, String> {
    let path = &versioning.probe.path;
    let Some(answer) = answer else {
        return Err(format!("the version was not asked at {path}"));
    };
    let Some(body) = &answer.body else {
        if answer.status == NOT_FOUND_STATUS {
            if versioning.fallback_to_oldest == Some(true) {
                return Ok(None);
            }
            if let Some(env) = &versioning.env {
                return Err(format!(
                    "GET {path} answered 404, so this server may be older than the release that has it; set {env} to its version"
                ));
            }
        }
        return Err(format!("GET {path} answered {}", answer.status));
    };
    read_version(body, &versioning.probe).map(Some).map_err(|error| error.0)
}
