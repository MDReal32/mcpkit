use regex::{Captures, Regex};

/// `input` with the match in `captures` replaced by `template`, read like the replacement string of JavaScript's
/// `String.prototype.replace`: `$$`, `$&`, `` $` ``, `$'`, `$1`…`$99` (two digits only when that group exists) and
/// `$<name>` when the pattern has named groups. A group that did not take part is empty; any other `$` stays as it is.
pub fn replace_first_match(input: &str, pattern: &Regex, captures: &Captures, template: &str) -> String {
    let whole = captures.get(0).map_or(0..0, |found| found.range());
    let group_count = captures.len() - 1;
    let named = pattern.capture_names().flatten().next().is_some();
    let group = |index: usize| captures.get(index).map_or("", |found| found.as_str());
    let mut replaced = String::from(&input[..whole.start]);
    let mut rest = template;
    while let Some(dollar) = rest.find('$') {
        replaced.push_str(&rest[..dollar]);
        let after = &rest[dollar + 1..];
        let digits: Vec<usize> = after
            .chars()
            .take(2)
            .map_while(|character| character.to_digit(10))
            .map(|digit| digit as usize)
            .collect();
        let (substitution, consumed) = match (after.chars().next(), digits.as_slice()) {
            (Some('$'), _) => ("$".to_owned(), 1),
            (Some('&'), _) => (input[whole.clone()].to_owned(), 1),
            (Some('`'), _) => (input[..whole.start].to_owned(), 1),
            (Some('\''), _) => (input[whole.end..].to_owned(), 1),
            (_, [tens, ones]) if (1..=group_count).contains(&(tens * 10 + ones)) => {
                (group(tens * 10 + ones).to_owned(), 2)
            }
            (_, [first, ..]) if (1..=group_count).contains(first) => (group(*first).to_owned(), 1),
            (Some('<'), _) if named => match after.find('>') {
                Some(close) => (
                    captures
                        .name(&after[1..close])
                        .map_or("", |found| found.as_str())
                        .to_owned(),
                    close + 1,
                ),
                None => ("$<".to_owned(), 1),
            },
            _ => ("$".to_owned(), 0),
        };
        replaced.push_str(&substitution);
        rest = &after[consumed..];
    }
    replaced.push_str(rest);
    replaced.push_str(&input[whole.end..]);
    replaced
}

#[cfg(test)]
mod tests {
    use super::replace_first_match;
    use regex::Regex;

    /// Pattern, input, template and what JavaScript's `input.replace(new RegExp(pattern), template)` returns.
    const JAVASCRIPT_REPLACEMENTS: &[(&str, &str, &str, &str)] = &[
        ("^(a)(b)?$", "a", "$1|$2|$&", "a||a"),
        ("(b)", "abc", "[$$]", "a[$]c"),
        ("(b)", "abc", "[$&]", "a[b]c"),
        ("(b)", "abc", "[$`]", "a[a]c"),
        ("(b)", "abc", "[$']", "a[c]c"),
        ("(b)", "abc", "[$10]", "a[b0]c"),
        ("(b)", "abc", "[$01]", "a[b]c"),
        ("(b)", "abc", "[$0]", "a[$0]c"),
        ("(b)", "abc", "[$00]", "a[$00]c"),
        ("(b)", "abc", "[$2]", "a[$2]c"),
        ("(b)", "abc", "[$<x>]", "a[$<x>]c"),
        ("(?<x>b)", "abc", "[$<x>]", "a[b]c"),
        ("(?<x>b)", "abc", "[$<y>]", "a[]c"),
        ("(?<x>b)", "abc", "[$<x]", "a[$<x]c"),
        ("(b)", "abc", "[$]", "a[$]c"),
        ("(b)", "abc", "[$$1]", "a[$1]c"),
        ("b", "abcb", "X", "aXcb"),
        (
            "(a)(b)(c)(d)(e)(f)(g)(h)(i)(j)(k)",
            "abcdefghijk",
            "$11-$10-$1-$12",
            "k-j-a-a2",
        ),
    ];

    #[test]
    fn replaces_the_first_match_like_javascript() {
        for (pattern, input, template, expected) in JAVASCRIPT_REPLACEMENTS {
            let regex = Regex::new(pattern).unwrap();
            let captures = regex.captures(input).unwrap();

            let replaced = replace_first_match(input, &regex, &captures, template);

            assert_eq!(&replaced, expected, "{pattern} on {input} with {template}");
        }
    }
}
