/// What one run of the dev binary is: the runner a client starts, or the server that runner runs.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ProcessRole {
    Runner,
    Server,
}
