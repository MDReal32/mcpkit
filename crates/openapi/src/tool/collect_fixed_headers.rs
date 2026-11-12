use crate::consts::EXECUTOR_HEADERS;
use crate::endpoints::Parameter;
use indexmap::IndexMap;

/// Required header parameters with a string default, sent as they are.
pub fn collect_fixed_headers(parameters: &[Parameter]) -> IndexMap<String, String> {
    parameters
        .iter()
        .filter(|parameter| {
            parameter.location == "header"
                && parameter.required
                && !EXECUTOR_HEADERS.contains(&parameter.name.to_ascii_lowercase().as_str())
        })
        .filter_map(|parameter| {
            let default = parameter.schema?.get("default")?.as_str()?;
            Some((parameter.name.clone(), default.to_owned()))
        })
        .collect()
}
