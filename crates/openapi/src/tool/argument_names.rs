use crate::tool::sanitize_argument_name::sanitize_argument_name;

/// The argument names a tool has given out, so a parameter and a body property of the same name stay apart.
#[derive(Default)]
pub struct ArgumentNames {
    taken: Vec<String>,
}

impl ArgumentNames {
    /// `name` as an argument name; when it is taken, with `prefix` (`body_`, `query_`), then `_2`, `_3`….
    pub fn claim(&mut self, name: &str, prefix: &str) -> String {
        let base = sanitize_argument_name(name);
        let mut candidate = base.clone();
        if self.is_taken(&candidate) {
            candidate = format!("{prefix}{base}");
        }
        let prefixed = candidate.clone();
        let mut counter = 2;
        while self.is_taken(&candidate) {
            candidate = format!("{prefixed}_{counter}");
            counter += 1;
        }
        self.taken.push(candidate.clone());
        candidate
    }

    fn is_taken(&self, name: &str) -> bool {
        self.taken.iter().any(|taken| taken == name)
    }
}
