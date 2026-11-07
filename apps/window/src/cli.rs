use clap::Parser;

#[derive(Debug, Parser)]
#[command(
    name = "usemcpkit-window",
    version,
    about = "The usemcpkit credentials window, started by usemcpkit-servers with the request as JSON on stdin"
)]
pub struct Cli {
    /// The loopback URL of the credentials form server, its session token in the fragment
    pub url: String,
}
