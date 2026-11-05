/// The project a call belongs to.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct ProjectInfo {
    /// The git root as git prints it (`D:/work/app` on Windows), else the directory itself; projects are bound by it.
    pub key: String,
    /// The host of the `origin` remote, lowercase.
    pub remote_host: Option<String>,
}
