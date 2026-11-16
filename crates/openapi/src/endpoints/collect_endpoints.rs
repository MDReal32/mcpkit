use crate::OpenApiError;
use crate::consts::HTTP_METHODS;
use crate::document::SpecDocument;
use crate::endpoints::Endpoint;
use crate::endpoints::read_parameters::read_parameters;
use serde_json::Value;

/// Every endpoint of the document, in its order and the order of [`HTTP_METHODS`].
pub fn collect_endpoints<'a>(document: &SpecDocument<'a>, base_path: &str) -> Result<Vec<Endpoint<'a>>, OpenApiError> {
    let mut endpoints = Vec::new();
    for (path, item) in document
        .root
        .get("paths")
        .and_then(Value::as_object)
        .into_iter()
        .flatten()
    {
        let item = document.resolve(item)?;
        let shared = read_parameters(document, item)?;
        for method in HTTP_METHODS {
            let Some(Value::Object(operation)) = item.get(method) else {
                continue;
            };
            let own = read_parameters(document, &item[method])?;
            let mut parameters = Vec::new();
            for parameter in &shared {
                let overridden = own
                    .iter()
                    .any(|candidate| candidate.name == parameter.name && candidate.location == parameter.location);
                if !overridden {
                    parameters.push(parameter.clone());
                }
            }
            parameters.extend(own);
            endpoints.push(Endpoint {
                method,
                path: format!("{base_path}{path}"),
                operation,
                parameters,
            });
        }
    }
    Ok(endpoints)
}
