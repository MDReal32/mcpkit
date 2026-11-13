/// One source a host's tools were built from, with the version the host runs when the source has versions.
#[derive(Clone, Debug, PartialEq)]
pub struct HostSource {
    pub name: String,
    pub version: Option<String>,
}
