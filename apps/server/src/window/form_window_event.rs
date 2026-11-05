#[derive(Debug, PartialEq)]
pub enum FormWindowEvent {
    Close,
    Fit { width: u32, height: u32 },
    OpenLink(String),
}
