use crate::client_context::ClientContext;
use crate::client_definition::ClientDefinition;
use crate::config::read_config_text;
use crate::detected_client::DetectedClient;
use crate::entry::has_client_entry;

pub fn inspect_client(definition: &ClientDefinition, context: &ClientContext) -> DetectedClient {
    let config_path = (definition.config_path)(context);
    let has_entry = read_config_text(&config_path).and_then(|text| has_client_entry(definition, &text, &config_path));
    match has_entry {
        Ok(has_entry) => DetectedClient {
            definition: *definition,
            config_path,
            has_entry,
            problem: None,
        },
        Err(error) => DetectedClient {
            definition: *definition,
            config_path,
            has_entry: false,
            problem: Some(error.0),
        },
    }
}
