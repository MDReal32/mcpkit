/// The document to build a source's tools from.
pub struct SpecChoice {
    pub url: String,
    /// The version of the document: the server's, or the nearest older one published; absent without versions.
    pub spec_version: Option<String>,
}
