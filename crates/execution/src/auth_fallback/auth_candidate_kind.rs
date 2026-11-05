/// `Stored` always goes first, `Provided` may be remembered as the server's working auth, `Interactive` asks the user.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum AuthCandidateKind {
    Stored,
    Provided,
    Interactive,
}
