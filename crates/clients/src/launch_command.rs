/// The program a client starts usemcpkit with.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct LaunchCommand {
    pub command: String,
    pub args: Vec<String>,
}
