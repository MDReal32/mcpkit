use crate::args::{ArgValue, ToolArgs};
use crate::request::build_body_payload::build_body_payload;
use crate::request::build_form_data::build_form_data;
use crate::request::consts::{CONTENT_TYPE_HEADER, MULTIPART_CONTENT_TYPE};
use crate::request::request_content::RequestContent;
use crate::request::serialize_body::serialize_body;
use indexmap::IndexMap;
use mcpkit_http::RequestBody;
use mcpkit_manifest::tool::RequestSpec;

/// A multipart form sets its own content type; any other body is sent under `content_type`, an uploaded file as its
/// bytes.
pub fn build_request_body(spec: &RequestSpec, args: &ToolArgs, content_type: &str) -> Option<RequestContent> {
    if content_type == MULTIPART_CONTENT_TYPE {
        let parts = build_form_data(spec, args);
        if parts.is_empty() {
            return None;
        }
        return Some(RequestContent {
            body: RequestBody::Form(parts),
            headers: IndexMap::new(),
        });
    }
    let payload = build_body_payload(spec, args)?;
    let body = match payload {
        ArgValue::File(file) => RequestBody::Bytes(file.data),
        payload => RequestBody::Text(serialize_body(&payload.to_json(), content_type)),
    };
    Some(RequestContent {
        body,
        headers: [(CONTENT_TYPE_HEADER.to_owned(), content_type.to_owned())]
            .into_iter()
            .collect(),
    })
}
