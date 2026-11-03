use crate::ui::find_placeholders::find_placeholders;

/// Replaces `{name}` with its value; a placeholder without a value stays as it is.
pub fn fill_template(template: &str, values: &[(&str, &str)]) -> String {
    let mut filled = String::with_capacity(template.len());
    let mut copied = 0;
    for (span, name) in find_placeholders(template) {
        let Some((_, value)) = values.iter().find(|(key, _)| *key == name) else {
            continue;
        };
        filled.push_str(&template[copied..span.start]);
        filled.push_str(value);
        copied = span.end;
    }
    filled.push_str(&template[copied..]);
    filled
}

#[cfg(test)]
mod tests {
    use super::fill_template;

    #[test]
    fn fills_known_placeholders_and_leaves_the_others() {
        assert_eq!(
            fill_template(
                "{server} at {domain}/{other}",
                &[("server", "gh"), ("domain", "{server}")]
            ),
            "gh at {server}/{other}"
        );
    }
}
