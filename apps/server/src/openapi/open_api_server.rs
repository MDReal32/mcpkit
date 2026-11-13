use usemcpkit_manifest::Manifest;

/// An OpenAPI catalog server with the tools of the version its host runs.
pub struct OpenApiServer {
    /// The manifest with the built tools in `tools`, the hand-written ones that apply among them.
    pub manifest: Manifest,
    /// What the model should know about the tools, such as a document of an older version being used.
    pub warnings: Vec<String>,
}
