/// A content type a tool can return as text.
pub fn is_readable_type(content_type: &str) -> bool {
    content_type.contains("json") || content_type.starts_with("text/") || content_type.contains("xml")
}
