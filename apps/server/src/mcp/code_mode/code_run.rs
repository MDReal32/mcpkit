/// What one run produced: the JSON of what the function returned (`None` when it has none) or the error, and the
/// console lines it wrote either way.
pub struct CodeRun {
    pub result: Result<Option<String>, String>,
    pub logs: Vec<String>,
}
