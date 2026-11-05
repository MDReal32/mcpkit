/// The two executables a release ships: the runner AI clients start, and the server it runs next to it.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct BinaryPair {
    pub runner: Vec<u8>,
    pub server: Vec<u8>,
}
