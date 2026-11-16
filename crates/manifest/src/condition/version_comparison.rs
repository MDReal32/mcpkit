use crate::condition::compare_versions::compare_versions;
use crate::condition::comparison_operator::ComparisonOperator;

/// `{version} <operator> <version>`, one comparison of a condition.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct VersionComparison {
    pub operator: ComparisonOperator,
    pub version: String,
}

impl VersionComparison {
    pub fn holds(&self, version: &str) -> bool {
        self.operator.holds(compare_versions(version, &self.version))
    }
}
