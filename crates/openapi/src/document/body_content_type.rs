use crate::consts::{FORM_CONTENT_TYPE, JSON_CONTENT_TYPE, MULTIPART_CONTENT_TYPE};

/// The content type of a Swagger 2.0 body: multipart for files, else the JSON type it declares, else JSON unless it
/// declares only a form (Swagger 2.0 lists form fields the same way for JSON and form bodies, and the APIs that publish
/// it, such as GitLab, read both).
pub fn body_content_type(consumes: &[String], has_file: bool) -> String {
    if has_file
        || consumes
            .iter()
            .any(|content_type| content_type == MULTIPART_CONTENT_TYPE)
    {
        return MULTIPART_CONTENT_TYPE.to_owned();
    }
    let json_like = consumes
        .iter()
        .find(|content_type| content_type.as_str() == JSON_CONTENT_TYPE || content_type.ends_with("+json"));
    if let Some(json_like) = json_like {
        return json_like.clone();
    }
    if consumes.iter().any(|content_type| content_type == FORM_CONTENT_TYPE) {
        return FORM_CONTENT_TYPE.to_owned();
    }
    consumes
        .first()
        .cloned()
        .unwrap_or_else(|| JSON_CONTENT_TYPE.to_owned())
}
