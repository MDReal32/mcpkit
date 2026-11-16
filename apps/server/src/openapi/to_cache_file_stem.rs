use crate::openapi::consts::VERSION_SEPARATOR;

/// `<source>` or `<source>@<version>`, with anything a file name should not hold replaced by `_`.
pub fn to_cache_file_stem(source: &str, version: Option<&str>) -> String {
    let stem = match version {
        Some(version) => format!("{source}{VERSION_SEPARATOR}{version}"),
        None => source.to_owned(),
    };
    stem.chars()
        .map(|character| {
            if character.is_ascii_alphanumeric() || matches!(character, '.' | '-' | '_' | VERSION_SEPARATOR) {
                character
            } else {
                '_'
            }
        })
        .collect()
}
