use crate::body::selected_schema::SelectedSchema;

/// The request body content a tool sends, and its schema (a reference into the document, or inline).
pub struct SelectedBody<'a> {
    pub content_type: String,
    pub schema: SelectedSchema<'a>,
}
