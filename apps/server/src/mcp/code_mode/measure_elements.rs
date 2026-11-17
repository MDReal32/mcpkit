use crate::mcp::code_mode::consts::MAX_OUTPUT_CHARS;
use crate::mcp::code_mode::print_value::print_value;
use serde_json::Value;

/// How much of a returned array the output limit lets through.
pub struct ElementWindow {
    /// How many leading elements fit; `0` when even the first is over the limit.
    pub shown: usize,
    /// The printed length of the whole array's elements, in characters.
    pub total_chars: usize,
}

/// Counts the leading elements whose printed text stays within [`MAX_OUTPUT_CHARS`], which both the `content` items and
/// the `structuredContent` of a run cut at.
pub fn measure_elements(elements: &[Value]) -> ElementWindow {
    let lengths: Vec<usize> = elements
        .iter()
        .map(|element| print_value(element).chars().count())
        .collect();
    let total_chars: usize = lengths.iter().sum();
    if total_chars <= MAX_OUTPUT_CHARS {
        return ElementWindow {
            shown: elements.len(),
            total_chars,
        };
    }
    let mut used = 0;
    let mut shown = 0;
    for length in &lengths {
        if used + length > MAX_OUTPUT_CHARS {
            break;
        }
        used += length;
        shown += 1;
    }
    ElementWindow { shown, total_chars }
}

#[cfg(test)]
mod tests {
    use super::measure_elements;
    use crate::mcp::code_mode::consts::MAX_OUTPUT_CHARS;
    use serde_json::json;

    #[test]
    fn shows_everything_within_the_limit() {
        let window = measure_elements(&[json!("a"), json!("bc")]);
        assert_eq!(window.shown, 2);
        assert_eq!(window.total_chars, 3);
    }

    #[test]
    fn stops_before_the_element_that_crosses_the_limit() {
        let element = json!("x".repeat(MAX_OUTPUT_CHARS / 4));
        let window = measure_elements(&vec![element; 10]);
        assert_eq!(window.shown, 4);
    }

    #[test]
    fn shows_nothing_when_the_first_element_is_over_the_limit() {
        let window = measure_elements(&[json!("x".repeat(MAX_OUTPUT_CHARS + 1)), json!(1)]);
        assert_eq!(window.shown, 0);
    }
}
