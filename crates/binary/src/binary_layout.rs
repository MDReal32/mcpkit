/// How the runner and the server it runs are shipped.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum BinaryLayout {
    /// A release: the runner and `usemcpkit-servers` next to it, both replaced by newer releases.
    Pair,
    /// A dev build: one binary that is the runner and its own server. Installing writes it as both files of the pair,
    /// and it never replaces itself with a release.
    Combined,
}
