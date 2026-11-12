/// `text` with each Markdown link `[label](url)` replaced by its label.
pub fn strip_markdown_links(text: &str) -> String {
    let mut result = String::with_capacity(text.len());
    let mut rest = text;
    while let Some(open) = rest.find('[') {
        let after_open = &rest[open + 1..];
        let link = after_open.find("](").and_then(|label_end| {
            let label = &after_open[..label_end];
            let url_start = label_end + 2;
            let url_end = after_open[url_start..].find(')')? + url_start;
            (!label.is_empty() && !label.contains(']')).then_some((label, url_end))
        });
        match link {
            Some((label, url_end)) => {
                result.push_str(&rest[..open]);
                result.push_str(label);
                rest = &after_open[url_end + 1..];
            }
            None => {
                result.push_str(&rest[..=open]);
                rest = after_open;
            }
        }
    }
    result.push_str(rest);
    result
}
