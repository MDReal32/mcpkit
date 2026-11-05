#[derive(Clone, Debug, PartialEq, Eq)]
pub struct PackageManagerInstall {
    pub manager: String,
    pub path: String,
    pub upgrade_command: String,
}
