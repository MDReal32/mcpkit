use crate::OpenApiError;
use crate::endpoints::Endpoint;
use crate::naming::fallback_name::fallback_name;
use indexmap::IndexMap;
use usemcpkit_manifest::naming::apply_naming_rule;

/// One tool name per endpoint, in their order: the first naming rule that matches `METHOD /path`, else the fallback;
/// a name already given gets `_2`, `_3`… after its last segment.
pub fn name_endpoints(endpoints: &[Endpoint], rules: &IndexMap<String, String>) -> Result<Vec<String>, OpenApiError> {
    let mut names: Vec<String> = Vec::with_capacity(endpoints.len());
    for endpoint in endpoints {
        let subject = endpoint.subject();
        let mut named = None;
        for (pattern, template) in rules {
            named = apply_naming_rule(pattern, template, &subject).map_err(OpenApiError)?;
            if named.is_some() {
                break;
            }
        }
        let base = named.unwrap_or_else(|| fallback_name(endpoint.method, &endpoint.path));
        let mut name = base.clone();
        let mut counter = 2;
        while names.contains(&name) {
            name = format!("{base}_{counter}");
            counter += 1;
        }
        names.push(name);
    }
    Ok(names)
}
