/// A command that prints a token on stdout; run without a shell.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct CliTokenCommand {
    pub command: String,
    pub args: Vec<String>,
}
