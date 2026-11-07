use crate::browser::browser_command::browser_command;
use std::process::{Command, Stdio};

/// Best effort: the URL is printed first, so a missing opener only costs a manual copy.
pub fn open_browser(url: &str) {
    let opener = browser_command(std::env::consts::OS, url);
    let spawned = Command::new(opener.command)
        .args(&opener.args)
        .stdin(Stdio::null())
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .spawn();
    if let Err(error) = spawned {
        eprintln!("usemcpkit: could not open a browser ({error}), open the URL above manually");
    }
}
