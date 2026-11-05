/// A part equal to the one before it is named once: `issues:issues:get_issue` keeps `issues` and `get_issue`.
pub fn drop_repeated_parts<'a>(parts: &[&'a str]) -> Vec<&'a str> {
    parts
        .iter()
        .enumerate()
        .filter(|(index, part)| *index == 0 || parts[index - 1] != **part)
        .map(|(_, part)| *part)
        .collect()
}
