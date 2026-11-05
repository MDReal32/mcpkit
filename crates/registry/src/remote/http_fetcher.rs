use crate::consts::FETCH_TIMEOUT;
use crate::registry_error::RegistryError;
use crate::remote::fetch::Fetch;

pub struct HttpFetcher {
    client: reqwest::Client,
}

impl HttpFetcher {
    pub fn new() -> Result<Self, RegistryError> {
        reqwest::Client::builder()
            .timeout(FETCH_TIMEOUT)
            .build()
            .map(|client| HttpFetcher { client })
            .map_err(|error| RegistryError::failed(format!("cannot start the HTTP client: {error}")))
    }
}

impl Fetch for HttpFetcher {
    async fn fetch_text(&self, url: &str) -> Result<String, RegistryError> {
        let failed = |reason: String| RegistryError::failed(format!("GET {url} failed: {reason}"));
        let response = self
            .client
            .get(url)
            .send()
            .await
            .map_err(|error| failed(error.to_string()))?;
        let status = response.status();
        if !status.is_success() {
            return Err(failed(status.as_u16().to_string()));
        }
        response.text().await.map_err(|error| failed(error.to_string()))
    }
}
