use crate::openapi::consts::SIGN_IN_PATH;
use usemcpkit_manifest::openapi::OpenApiSource;
use usemcpkit_manifest::tool::{HttpMethod, RequestSpec};

/// The GET that asks a source's server for its version, or only checks the sign-in of a source without versions.
pub fn to_probe_request(source: &OpenApiSource) -> RequestSpec {
    let path = source
        .version
        .as_ref()
        .map_or(SIGN_IN_PATH, |versioning| versioning.probe.path.as_str());
    RequestSpec {
        method: HttpMethod::Get,
        path: path.to_owned(),
        query: None,
        body: None,
        body_arg: None,
        content_type: None,
        comma_query: None,
        file_args: None,
        save_to_arg: None,
        fixed_query: None,
        fixed_headers: None,
        fixed_body: None,
    }
}
