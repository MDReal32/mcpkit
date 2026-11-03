use crate::consts::{FILE_PART_CONTENT_TYPE, USER_AGENT};
use crate::describe_reqwest_error::describe_reqwest_error;
use crate::form_value::FormValue;
use crate::http_client::HttpClient;
use crate::http_error::HttpError;
use crate::http_request::HttpRequest;
use crate::http_response::HttpResponse;
use crate::request_body::RequestBody;
use mcpkit_core::LocalFuture;
use mcpkit_manifest::tool::HttpMethod;
use reqwest::multipart::{Form, Part};
use std::time::Duration;

/// The network client; redirects are followed, and credentials are dropped on a redirect to another host.
pub struct ReqwestClient {
    client: reqwest::Client,
}

impl ReqwestClient {
    pub fn new() -> Result<Self, HttpError> {
        reqwest::Client::builder()
            .user_agent(USER_AGENT)
            .build()
            .map(|client| ReqwestClient { client })
            .map_err(|error| {
                HttpError(format!(
                    "cannot start the HTTP client: {}",
                    describe_reqwest_error(error)
                ))
            })
    }

    async fn send_request(&self, request: &HttpRequest, timeout: Duration) -> Result<HttpResponse, HttpError> {
        let method = match request.method {
            HttpMethod::Get => reqwest::Method::GET,
            HttpMethod::Post => reqwest::Method::POST,
            HttpMethod::Put => reqwest::Method::PUT,
            HttpMethod::Patch => reqwest::Method::PATCH,
            HttpMethod::Delete => reqwest::Method::DELETE,
        };
        let mut builder = self.client.request(method, &request.url).timeout(timeout);
        for (name, value) in &request.headers {
            builder = builder.header(name, value);
        }
        builder = match &request.body {
            None => builder,
            Some(RequestBody::Text(text)) => builder.body(text.clone()),
            Some(RequestBody::Bytes(bytes)) => builder.body(bytes.clone()),
            Some(RequestBody::Form(parts)) => {
                let mut form = Form::new();
                for part in parts {
                    form = match &part.value {
                        FormValue::Text(text) => form.text(part.name.clone(), text.clone()),
                        FormValue::File { file_name, data } => {
                            let file = Part::bytes(data.clone())
                                .file_name(file_name.clone())
                                .mime_str(FILE_PART_CONTENT_TYPE)
                                .map_err(|error| HttpError(describe_reqwest_error(error)))?;
                            form.part(part.name.clone(), file)
                        }
                    };
                }
                builder.multipart(form)
            }
        };
        let response = builder
            .send()
            .await
            .map_err(|error| HttpError(describe_reqwest_error(error)))?;
        let status = response.status().as_u16();
        let content_type = response
            .headers()
            .get(reqwest::header::CONTENT_TYPE)
            .and_then(|value| value.to_str().ok())
            .map(str::to_owned);
        let headers = response
            .headers()
            .iter()
            .filter_map(|(name, value)| Some((name.as_str().to_owned(), value.to_str().ok()?.to_owned())))
            .collect();
        let body = response
            .bytes()
            .await
            .map_err(|error| HttpError(describe_reqwest_error(error)))?;
        Ok(HttpResponse {
            status,
            content_type,
            headers,
            body: body.to_vec(),
        })
    }
}

impl HttpClient for ReqwestClient {
    fn send<'a>(
        &'a self,
        request: &'a HttpRequest,
        timeout: Duration,
    ) -> LocalFuture<'a, Result<HttpResponse, HttpError>> {
        Box::pin(self.send_request(request, timeout))
    }
}
