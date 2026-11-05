use crate::guards::is_domain_value_list;
use crate::server::consts::DOMAIN_TEXT_KEYS;
use crate::server::read_templatable_urls::read_templatable_urls;
use serde_json::{Map, Value};
use usemcpkit_manifest::domain::{DOMAIN_PLACEHOLDER, is_domain_value};

pub fn validate_domain_spec(manifest: &Map<String, Value>) -> Vec<String> {
    let uses_domain = read_templatable_urls(manifest)
        .iter()
        .any(|url| url.contains(DOMAIN_PLACEHOLDER));
    let Some(domain) = manifest.get("domain") else {
        return if uses_domain {
            vec![format!("domain is required when a URL uses {DOMAIN_PLACEHOLDER}")]
        } else {
            Vec::new()
        };
    };
    let Some(domain) = domain.as_object() else {
        return vec!["domain must be an object".to_owned()];
    };
    let mut errors = Vec::new();
    if !uses_domain {
        errors.push(format!("domain is set but no URL uses {DOMAIN_PLACEHOLDER}"));
    }
    if domain
        .get("default")
        .is_some_and(|default| !default.as_str().is_some_and(is_domain_value))
    {
        errors.push("domain.default must look like host[:port][/path]".to_owned());
    }
    for key in DOMAIN_TEXT_KEYS {
        if domain.get(*key).is_some_and(|value| !value.is_string()) {
            errors.push(format!("domain.{key} must be a string"));
        }
    }
    if domain.get("matchGitRemote").is_some_and(|value| !value.is_boolean()) {
        errors.push("domain.matchGitRemote must be a boolean".to_owned());
    }
    if domain
        .get("suggestedHosts")
        .is_some_and(|hosts| !is_domain_value_list(hosts))
    {
        errors.push("domain.suggestedHosts must be a list of host[:port][/path]".to_owned());
    }
    if domain.get("loopbackHttp").is_some_and(|value| !value.is_boolean()) {
        errors.push("domain.loopbackHttp must be a boolean".to_owned());
    }
    errors
}
