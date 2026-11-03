/// What the config says about the host of a call.
#[derive(Clone, Debug, PartialEq, Eq)]
pub enum SavedDomain {
    /// No host is known yet.
    None,
    /// Several hosts are known and nothing says which one this project uses, so the form asks.
    Undecided,
    Host(String),
}
