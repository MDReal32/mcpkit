//! Stands in for `gh auth token --hostname <host>` in the tests: it prints a token for github.com and fails like `gh`
//! does for hosts it is not logged in to.

use std::process::ExitCode;

fn main() -> ExitCode {
    let host = std::env::args().nth(4).unwrap_or_default();
    if host == "github.com" {
        println!("gho_from_cli");
        return ExitCode::SUCCESS;
    }
    eprintln!("no oauth token found for {host}");
    ExitCode::FAILURE
}
