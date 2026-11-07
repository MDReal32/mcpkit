use usemcpkit_core::browser::open_browser;

pub fn fall_back_to_browser(url: &str, reason: &str) {
    eprintln!("usemcpkit: could not open the credentials window ({reason}), opening the default browser");
    open_browser(url);
}
