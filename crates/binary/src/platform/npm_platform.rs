/// The `os`/`cpu`/`libc` fields npm uses to pick the package for a machine.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct NpmPlatform {
    pub os: &'static str,
    pub cpu: &'static str,
    pub libc: Option<&'static str>,
}
