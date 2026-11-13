use crate::condition::condition_token::ConditionToken;
use crate::condition::parse_condition_clause::parse_condition_clause;
use crate::condition::tokenize_condition::tokenize_condition;
use crate::condition::version_comparison::VersionComparison;

/// The comparisons of a condition such as `9.0 <= {version} < 10` or `{version} >= 9.0 && {version} < 10`: clauses
/// joined by `&&`, each a chain of versions and operators in which every comparison has `{version}` on one side.
pub fn parse_version_condition(text: &str) -> Result<Vec<VersionComparison>, String> {
    let tokens = tokenize_condition(text)?;
    let mut comparisons = Vec::new();
    for clause in tokens.split(|token| *token == ConditionToken::And) {
        comparisons.extend(parse_condition_clause(clause)?);
    }
    Ok(comparisons)
}
