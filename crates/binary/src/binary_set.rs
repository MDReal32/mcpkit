/// The three executables a release ships: the runner AI clients start, the server it runs next to it, and the
/// credentials window the server opens from the same folder.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct BinarySet {
    pub runner: Vec<u8>,
    pub server: Vec<u8>,
    pub window: Vec<u8>,
}
