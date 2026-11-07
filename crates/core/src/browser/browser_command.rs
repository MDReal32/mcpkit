pub struct BrowserCommand {
    pub command: &'static str,
    pub args: Vec<String>,
}

pub fn browser_command(os: &str, url: &str) -> BrowserCommand {
    match os {
        "macos" => BrowserCommand {
            command: "open",
            args: vec![url.into()],
        },
        "windows" => BrowserCommand {
            command: "rundll32",
            args: vec!["url.dll,FileProtocolHandler".into(), url.into()],
        },
        _ => BrowserCommand {
            command: "xdg-open",
            args: vec![url.into()],
        },
    }
}
