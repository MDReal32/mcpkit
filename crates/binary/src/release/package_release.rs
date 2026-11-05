#[derive(Clone, Debug, PartialEq, Eq)]
pub struct PackageRelease {
    pub version: String,
    pub tarball: String,
    pub integrity: String,
}
