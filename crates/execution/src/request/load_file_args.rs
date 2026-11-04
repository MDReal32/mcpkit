use crate::ToolError;
use crate::args::{ArgValue, ToolArgs};
use crate::request::read_uploaded_files::read_uploaded_files;
use serde_json::{Map, Value};
use usemcpkit_manifest::tool::ToolSpec;

/// Replaces each `fileArgs` argument that was given with the file or files at its paths.
pub async fn load_file_args(tool: &ToolSpec, args: Map<String, Value>) -> Result<ToolArgs, ToolError> {
    let mut loaded: ToolArgs = args
        .iter()
        .map(|(name, value)| (name.clone(), ArgValue::Json(value.clone())))
        .collect();
    for arg_name in tool.request.file_args.iter().flatten() {
        if let Some(value) = args.get(arg_name) {
            loaded.insert(arg_name.clone(), read_uploaded_files(arg_name, value).await?);
        }
    }
    Ok(loaded)
}

#[cfg(test)]
mod tests {
    use super::load_file_args;
    use crate::args::{ArgValue, UploadedFile};
    use serde_json::{Map, Value, json};
    use usemcpkit_manifest::tool::ToolSpec;

    fn upload_tool() -> ToolSpec {
        serde_json::from_value(json!({
            "name": "create_item",
            "description": "Create an item",
            "input": { "type": "object", "properties": { "owner": { "type": "string" } } },
            "request": { "method": "POST", "path": "/owners/{owner}/items", "body": ["title"], "fileArgs": ["file"] },
        }))
        .unwrap()
    }

    fn args(value: Value) -> Map<String, Value> {
        value.as_object().unwrap().clone()
    }

    #[tokio::test]
    async fn replaces_a_file_path_argument_with_the_file_name_and_bytes() {
        let dir = tempfile::tempdir().unwrap();
        let path = dir.path().join("note.txt");
        std::fs::write(&path, "hi").unwrap();

        let loaded = load_file_args(&upload_tool(), args(json!({ "owner": "o", "file": path })))
            .await
            .unwrap();

        let file = UploadedFile {
            name: "note.txt".into(),
            data: b"hi".to_vec(),
        };
        assert_eq!(loaded["file"], ArgValue::File(file));
        assert_eq!(loaded["owner"], ArgValue::Json(json!("o")));
    }

    #[tokio::test]
    async fn loads_every_path_of_an_array_argument() {
        let dir = tempfile::tempdir().unwrap();
        let first = dir.path().join("a.txt");
        let second = dir.path().join("b.txt");
        std::fs::write(&first, "a").unwrap();
        std::fs::write(&second, "b").unwrap();

        let loaded = load_file_args(&upload_tool(), args(json!({ "file": [first, second] })))
            .await
            .unwrap();

        let files = vec![
            UploadedFile {
                name: "a.txt".into(),
                data: b"a".to_vec(),
            },
            UploadedFile {
                name: "b.txt".into(),
                data: b"b".to_vec(),
            },
        ];
        assert_eq!(loaded["file"], ArgValue::Files(files));
    }

    #[tokio::test]
    async fn fails_with_a_tool_error_when_the_file_cannot_be_read() {
        let error = load_file_args(&upload_tool(), args(json!({ "file": "/nonexistent/usemcpkit-file" })))
            .await
            .unwrap_err();

        assert!(error.0.starts_with("Cannot read the file for \"file\": "), "{error}");
    }
}
