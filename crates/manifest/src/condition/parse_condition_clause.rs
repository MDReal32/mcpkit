use crate::condition::condition_token::ConditionToken;
use crate::condition::version_comparison::VersionComparison;

/// The comparisons of one `&&` clause: `a op b op c` compares each neighbouring pair.
pub fn parse_condition_clause(clause: &[ConditionToken]) -> Result<Vec<VersionComparison>, String> {
    if clause.len() < 3 || clause.len().is_multiple_of(2) {
        return Err("each part must compare {version} with a version, as in {version} >= 9.0".to_owned());
    }
    let mut comparisons = Vec::new();
    for index in (0..clause.len() - 1).step_by(2) {
        let ConditionToken::Operator(operator) = &clause[index + 1] else {
            return Err("an operator (<, <=, >, >=, ==, !=) must stand between two sides".to_owned());
        };
        let comparison = match (&clause[index], &clause[index + 2]) {
            (ConditionToken::Version, ConditionToken::Literal(version)) => VersionComparison {
                operator: *operator,
                version: version.clone(),
            },
            (ConditionToken::Literal(version), ConditionToken::Version) => VersionComparison {
                operator: operator.flipped(),
                version: version.clone(),
            },
            _ => return Err("every comparison must have {version} on one side and a version on the other".to_owned()),
        };
        comparisons.push(comparison);
    }
    Ok(comparisons)
}
