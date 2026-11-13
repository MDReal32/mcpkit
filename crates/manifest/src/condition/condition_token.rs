use crate::condition::comparison_operator::ComparisonOperator;

/// A token of a version condition.
#[derive(Clone, Debug, PartialEq, Eq)]
pub enum ConditionToken {
    /// `{version}`, the server's version.
    Version,
    /// A version written out, such as `9.0`.
    Literal(String),
    Operator(ComparisonOperator),
    And,
}
