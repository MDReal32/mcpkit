use crate::guards::{is_git_ref, is_https_url};
use crate::server::validate_setup_step::validate_setup_step;
use serde_json::Value;

pub fn validate_upstream_repo(repo: &Value) -> Vec<String> {
    let Some(repo) = repo.as_object() else {
        return vec!["upstream.repo must be an object".to_owned()];
    };
    let mut errors = Vec::new();
    if !is_https_url(repo.get("url")) {
        errors.push("upstream.repo.url must be an https:// URL".to_owned());
    }
    if !repo.get("ref").and_then(Value::as_str).is_some_and(is_git_ref) {
        errors.push("upstream.repo.ref must be a commit, tag or branch, not starting with '-'".to_owned());
    }
    match repo.get("setup") {
        None => {}
        Some(Value::Array(steps)) => errors.extend(
            steps
                .iter()
                .enumerate()
                .flat_map(|(position, step)| validate_setup_step(step, position)),
        ),
        Some(_) => errors.push("upstream.repo.setup must be a list of steps".to_owned()),
    }
    errors
}
