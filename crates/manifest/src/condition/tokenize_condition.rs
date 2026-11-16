use crate::condition::comparison_operator::ComparisonOperator;
use crate::condition::condition_token::ConditionToken;
use crate::condition::consts::{AND, VERSION_PLACEHOLDER};

/// The tokens of a version condition; whitespace only separates them.
pub fn tokenize_condition(text: &str) -> Result<Vec<ConditionToken>, String> {
    let mut tokens = Vec::new();
    let mut rest = text.trim_start();
    while let Some(next) = rest.chars().next() {
        let (token, length) = if rest.starts_with(VERSION_PLACEHOLDER) {
            (ConditionToken::Version, VERSION_PLACEHOLDER.len())
        } else if rest.starts_with(AND) {
            (ConditionToken::And, AND.len())
        } else if let Some((symbol, operator)) = ComparisonOperator::SYMBOLS
            .iter()
            .find(|(symbol, _)| rest.starts_with(symbol))
        {
            (ConditionToken::Operator(*operator), symbol.len())
        } else if next.is_ascii_digit() {
            let length = rest
                .find(|character: char| !character.is_ascii_digit() && character != '.')
                .unwrap_or(rest.len());
            let literal = &rest[..length];
            if literal.ends_with('.') || literal.contains("..") {
                return Err(format!("\"{literal}\" is not a version"));
            }
            (ConditionToken::Literal(literal.to_owned()), length)
        } else {
            return Err(format!("unexpected \"{next}\""));
        };
        tokens.push(token);
        rest = rest[length..].trim_start();
    }
    Ok(tokens)
}
