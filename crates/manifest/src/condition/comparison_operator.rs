use std::cmp::Ordering;

/// An operator of a version condition.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ComparisonOperator {
    Less,
    LessOrEqual,
    Greater,
    GreaterOrEqual,
    Equal,
    NotEqual,
}

impl ComparisonOperator {
    /// The operators by their symbols, the two-character ones first so `<=` is not read as `<`.
    pub const SYMBOLS: [(&'static str, ComparisonOperator); 6] = [
        ("<=", ComparisonOperator::LessOrEqual),
        (">=", ComparisonOperator::GreaterOrEqual),
        ("==", ComparisonOperator::Equal),
        ("!=", ComparisonOperator::NotEqual),
        ("<", ComparisonOperator::Less),
        (">", ComparisonOperator::Greater),
    ];

    /// Whether `left <op> right` holds for two versions that compare as `ordering`.
    pub fn holds(self, ordering: Ordering) -> bool {
        match self {
            ComparisonOperator::Less => ordering.is_lt(),
            ComparisonOperator::LessOrEqual => ordering.is_le(),
            ComparisonOperator::Greater => ordering.is_gt(),
            ComparisonOperator::GreaterOrEqual => ordering.is_ge(),
            ComparisonOperator::Equal => ordering.is_eq(),
            ComparisonOperator::NotEqual => ordering.is_ne(),
        }
    }

    /// The operator with its sides swapped: `9.0 <= {version}` is `{version} >= 9.0`.
    pub fn flipped(self) -> ComparisonOperator {
        match self {
            ComparisonOperator::Less => ComparisonOperator::Greater,
            ComparisonOperator::LessOrEqual => ComparisonOperator::GreaterOrEqual,
            ComparisonOperator::Greater => ComparisonOperator::Less,
            ComparisonOperator::GreaterOrEqual => ComparisonOperator::LessOrEqual,
            ComparisonOperator::Equal => ComparisonOperator::Equal,
            ComparisonOperator::NotEqual => ComparisonOperator::NotEqual,
        }
    }
}
