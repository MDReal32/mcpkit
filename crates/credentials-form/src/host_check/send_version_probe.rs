use crate::consts::{REFUSED_CHECK_MESSAGE, VERSION_CHECK_TIMEOUT};
use serde_json::Value;
use url::Url;
use usemcpkit_auth::ResolvedAuth;
use usemcpkit_manifest::Manifest;

/// GETs the probe path of a manifest whose domain is filled in, with its headers and the typed auth, and reads the
/// JSON answer.
pub async fn send_version_probe(manifest: &Manifest, path: &str, auth: Option<&ResolvedAuth>) -> Result<Value, String> {
    let mut url = Url::parse(&format!("{}{path}", manifest.base_url))
        .map_err(|error| format!("{}{path} is not a URL: {error}", manifest.base_url))?;
    if let Some(auth) = auth
        && !auth.query.is_empty()
    {
        url.query_pairs_mut().extend_pairs(&auth.query);
    }
    let client = reqwest::Client::builder()
        .timeout(VERSION_CHECK_TIMEOUT)
        .build()
        .map_err(|error| format!("cannot start the HTTP client: {error}"))?;
    let mut request = client.get(url.as_str()).header("Accept", "application/json");
    for (name, value) in manifest.headers.iter().flatten() {
        request = request.header(name, value);
    }
    if let Some(auth) = auth {
        for (name, value) in &auth.headers {
            request = request.header(name, value);
        }
    }
    let response = request
        .send()
        .await
        .map_err(|error| format!("GET {url} failed: {error}"))?;
    let status = response.status();
    if status == reqwest::StatusCode::UNAUTHORIZED || status == reqwest::StatusCode::FORBIDDEN {
        return Err(REFUSED_CHECK_MESSAGE.to_owned());
    }
    if !status.is_success() {
        return Err(format!("GET {url} answered {}", status.as_u16()));
    }
    let text = response
        .text()
        .await
        .map_err(|error| format!("GET {url} failed: {error}"))?;
    serde_json::from_str(&text).map_err(|error| format!("GET {url} did not answer JSON: {error}"))
}
