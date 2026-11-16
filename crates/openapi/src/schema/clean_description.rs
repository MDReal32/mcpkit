use crate::consts::MAX_DESCRIPTION_LENGTH;
use crate::schema::strip_markdown_links::strip_markdown_links;

/// The first paragraph of a description as one line, links reduced to their text, cut at the length limit.
pub fn clean_description(text: Option<&str>, strip_bold: bool) -> String {
    let first_paragraph: Vec<&str> = text
        .unwrap_or_default()
        .trim()
        .split('\n')
        .take_while(|line| !line.trim().is_empty())
        .collect();
    let without_links = strip_markdown_links(&first_paragraph.join("\n"));
    let without_bold = if strip_bold {
        without_links.replace("**", "")
    } else {
        without_links
    };
    let flattened = without_bold.split_whitespace().collect::<Vec<_>>().join(" ");
    if flattened.chars().count() <= MAX_DESCRIPTION_LENGTH {
        return flattened;
    }
    let cut: String = flattened.chars().take(MAX_DESCRIPTION_LENGTH - 1).collect();
    format!("{}…", cut.trim_end())
}
