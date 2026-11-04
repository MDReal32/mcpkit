use usemcpkit_clients::DetectedClient;

/// Resolves `--clients a,b` against the detected clients; ids that are unknown or not installed are an error.
pub fn find_requested_clients(detected: Vec<DetectedClient>, id_list: &str) -> Result<Vec<DetectedClient>, String> {
    let ids: Vec<&str> = id_list.split(',').map(str::trim).filter(|id| !id.is_empty()).collect();
    let missing: Vec<&str> = ids
        .iter()
        .copied()
        .filter(|id| !detected.iter().any(|client| client.definition.id == *id))
        .collect();
    if !missing.is_empty() {
        let available: Vec<&str> = detected.iter().map(|client| client.definition.id).collect();
        let available = if available.is_empty() {
            "none".to_owned()
        } else {
            available.join(", ")
        };
        return Err(format!(
            "not found on this computer: {}. Detected: {available}",
            missing.join(", ")
        ));
    }
    Ok(detected
        .into_iter()
        .filter(|client| ids.contains(&client.definition.id))
        .collect())
}

#[cfg(test)]
mod tests {
    use super::find_requested_clients;
    use std::path::PathBuf;
    use usemcpkit_clients::{CLIENT_DEFINITIONS, DetectedClient};

    fn detected(index: usize) -> DetectedClient {
        DetectedClient {
            definition: CLIENT_DEFINITIONS[index],
            config_path: PathBuf::from("config.json"),
            has_entry: false,
            problem: None,
        }
    }

    #[test]
    fn keeps_the_requested_clients_in_detection_order() {
        let first = CLIENT_DEFINITIONS[0].id;
        let second = CLIENT_DEFINITIONS[1].id;

        let found = find_requested_clients(vec![detected(0), detected(1)], &format!(" {second}, ,{first} ")).unwrap();

        let ids: Vec<&str> = found.iter().map(|client| client.definition.id).collect();
        assert_eq!(ids, [first, second]);
    }

    #[test]
    fn names_the_missing_ids_and_what_was_detected() {
        let first = CLIENT_DEFINITIONS[0].id;

        let some = find_requested_clients(vec![detected(0)], "nope,other").unwrap_err();
        let none = find_requested_clients(Vec::new(), "nope").unwrap_err();

        assert_eq!(
            some,
            format!("not found on this computer: nope, other. Detected: {first}")
        );
        assert_eq!(none, "not found on this computer: nope. Detected: none");
    }
}
