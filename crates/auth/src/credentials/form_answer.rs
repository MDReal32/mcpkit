use indexmap::IndexMap;

/// What the user entered in the credentials form, saved only once the API accepted it.
#[derive(Clone, Debug, Default, PartialEq)]
pub struct FormAnswer {
    /// Credential values by env var name, trimmed; empty for a sign-in.
    pub values: IndexMap<String, String>,
    /// The host chosen in the form, bound to the project that asked for it.
    pub domain: Option<String>,
}
