/// Where the formatted text and range sit in the document, and how it is indented.
pub struct FormatScope<'a> {
    pub document: &'a str,
    pub text_start: usize,
    pub text_end: usize,
    pub range_start: usize,
    pub range_end: usize,
    pub initial_indent_level: usize,
    pub indent: String,
    pub eol: &'static str,
}
