use crate::is_strictly_equal::is_strictly_equal;
use serde_json::Value;

/// The values that occur more than once, each once and in the order of its first repeat, compared like JavaScript's
/// `===`: a missing value, `null`, booleans, numbers and strings by value, objects and arrays never.
pub fn find_duplicates<'a>(values: &[Option<&'a Value>]) -> Vec<Option<&'a Value>> {
    let mut duplicates: Vec<Option<&Value>> = Vec::new();
    for (index, value) in values.iter().enumerate() {
        let seen_before = values[..index]
            .iter()
            .any(|earlier| is_strictly_equal(*earlier, *value));
        let listed = duplicates.iter().any(|listed| is_strictly_equal(*listed, *value));
        if seen_before && !listed {
            duplicates.push(*value);
        }
    }
    duplicates
}

#[cfg(test)]
mod tests {
    use super::find_duplicates;
    use serde_json::json;

    #[test]
    fn lists_each_repeated_primitive_once() {
        let a = json!("a");
        let b = json!("b");
        let one = json!(1);
        let one_float = json!(1.0);
        let object = json!({});
        let values = [
            Some(&a),
            Some(&b),
            Some(&a),
            Some(&a),
            None,
            None,
            Some(&one),
            Some(&one_float),
            Some(&object),
            Some(&object),
        ];
        assert_eq!(find_duplicates(&values), [Some(&a), None, Some(&one_float)]);
    }
}
