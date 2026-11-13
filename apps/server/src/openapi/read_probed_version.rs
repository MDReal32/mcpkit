use crate::openapi::probe_answer::ProbeAnswer;
use usemcpkit_manifest::openapi::SpecVersioning;
use usemcpkit_openapi::version::read_version;

/// The version in the server's answer to the probe.
pub fn read_probed_version(answer: Option<&ProbeAnswer>, versioning: &SpecVersioning) -> Result<String, String> {
    let path = &versioning.probe.path;
    let Some(answer) = answer else {
        return Err(format!("the version was not asked at {path}"));
    };
    let Some(body) = &answer.body else {
        return Err(format!("GET {path} answered {}", answer.status));
    };
    read_version(body, &versioning.probe).map_err(|error| error.0)
}
