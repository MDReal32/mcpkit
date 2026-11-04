use crate::ToolError;
use serde_json::{Value, json};
use std::path::Path;
use usemcpkit_http::HttpResponse;

/// Writes the body to the path the `saveToArg` argument holds and returns what was saved in its place.
pub async fn save_response_file(response: &HttpResponse, path: Option<&Value>) -> Result<Value, ToolError> {
    let Some(Value::String(path)) = path.filter(|path| path.as_str().is_some_and(|path| !path.is_empty())) else {
        return Err(ToolError::new("The save path must be a non-empty string"));
    };
    let write = async {
        if let Some(parent) = Path::new(path).parent().filter(|parent| !parent.as_os_str().is_empty()) {
            tokio::fs::create_dir_all(parent).await?;
        }
        tokio::fs::write(path, &response.body).await
    };
    write
        .await
        .map_err(|error| ToolError(format!("Cannot save the response to {path}: {error}")))?;
    Ok(json!({
        "savedTo": path,
        "bytes": response.body.len(),
        "contentType": response.content_type,
    }))
}

#[cfg(test)]
mod tests {
    use super::save_response_file;
    use serde_json::json;
    use usemcpkit_http::HttpResponse;

    #[tokio::test]
    async fn writes_the_body_into_missing_folders() {
        let dir = tempfile::tempdir().unwrap();
        let path = dir.path().join("nested").join("out.bin");
        let response = HttpResponse {
            status: 200,
            content_type: Some("application/octet-stream".into()),
            headers: Vec::new(),
            body: vec![1, 2, 3],
        };

        let saved = save_response_file(&response, Some(&json!(path))).await.unwrap();

        assert_eq!(std::fs::read(&path).unwrap(), vec![1, 2, 3]);
        assert_eq!(
            saved,
            json!({ "savedTo": path, "bytes": 3, "contentType": "application/octet-stream" })
        );
    }

    #[tokio::test]
    async fn rejects_a_missing_or_empty_path() {
        let response = HttpResponse::default();

        for path in [None, Some(json!("")), Some(json!(3))] {
            let error = save_response_file(&response, path.as_ref()).await.unwrap_err();
            assert_eq!(error.0, "The save path must be a non-empty string");
        }
    }
}
