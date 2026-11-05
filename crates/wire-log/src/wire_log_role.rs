#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum WireLogRole {
    Supervisor,
    Server,
}

impl WireLogRole {
    pub fn as_str(self) -> &'static str {
        match self {
            WireLogRole::Supervisor => "supervisor",
            WireLogRole::Server => "server",
        }
    }
}
