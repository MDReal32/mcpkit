use std::collections::HashMap;

/// The environment variables a call reads, like the TypeScript `Env`: the process environment when serving, a fixed set
/// in tests. Variables whose name or value is not valid UTF-8 are left out.
#[derive(Clone, Debug, Default, PartialEq, Eq)]
pub struct Env {
    vars: HashMap<String, String>,
}

impl Env {
    pub fn from_process() -> Self {
        let vars = std::env::vars_os()
            .filter_map(|(name, value)| Some((name.into_string().ok()?, value.into_string().ok()?)))
            .collect();
        Env { vars }
    }

    pub fn from_pairs<I, K, V>(pairs: I) -> Self
    where
        I: IntoIterator<Item = (K, V)>,
        K: Into<String>,
        V: Into<String>,
    {
        let vars = pairs
            .into_iter()
            .map(|(name, value)| (name.into(), value.into()))
            .collect();
        Env { vars }
    }

    /// The value when the variable is set, even to an empty string, like `env[name]`; on Windows the name is matched
    /// without regard to case, as Node's `process.env` does there (`Path` is `PATH`).
    pub fn get(&self, name: &str) -> Option<&str> {
        let exact = self.vars.get(name);
        let found = match (exact, cfg!(windows)) {
            (None, true) => self
                .vars
                .iter()
                .find(|(candidate, _)| candidate.eq_ignore_ascii_case(name))
                .map(|(_, value)| value),
            _ => exact,
        };
        found.map(String::as_str)
    }

    /// The value when it is set and not empty, like `env[name] || …`.
    pub fn get_non_empty(&self, name: &str) -> Option<&str> {
        self.get(name).filter(|value| !value.is_empty())
    }

    /// The same variables with `name` set to `value`.
    pub fn with(&self, name: &str, value: &str) -> Self {
        let mut vars = self.vars.clone();
        vars.insert(name.to_owned(), value.to_owned());
        Env { vars }
    }
}
