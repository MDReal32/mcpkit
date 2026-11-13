use crate::condition::parse_version_condition::parse_version_condition;
use crate::condition::version_comparison::VersionComparison;
use serde::{Deserialize, Serialize};

/// A condition on the server's version, written as in `9.0 <= {version} < 10`; it reads and writes as that text.
#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
#[serde(try_from = "String", into = "String")]
pub struct VersionCondition {
    text: String,
    comparisons: Vec<VersionComparison>,
}

impl VersionCondition {
    /// Whether every comparison holds for `version`.
    pub fn matches(&self, version: &str) -> bool {
        self.comparisons.iter().all(|comparison| comparison.holds(version))
    }

    pub fn text(&self) -> &str {
        &self.text
    }
}

impl TryFrom<String> for VersionCondition {
    type Error = String;

    fn try_from(text: String) -> Result<Self, Self::Error> {
        let comparisons = parse_version_condition(&text)?;
        Ok(VersionCondition { text, comparisons })
    }
}

impl From<VersionCondition> for String {
    fn from(condition: VersionCondition) -> Self {
        condition.text
    }
}
