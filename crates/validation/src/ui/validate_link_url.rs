use crate::guards::is_https_url;
use crate::ui::consts::UI_URL_PLACEHOLDERS;
use crate::ui::format_placeholders::format_placeholders;
use serde_json::Value;
use usemcpkit_manifest::ui::{UI_DOMAIN_PLACEHOLDERS, read_placeholders};

pub fn validate_link_url(url: Option<&Value>, location: &str, has_domain: bool) -> Vec<String> {
    let Some(url) = url.filter(|url| is_https_url(Some(url))).and_then(Value::as_str) else {
        return vec![format!("{location}.url must be an https:// URL")];
    };
    let placeholders = read_placeholders(url);
    let unknown: Vec<&str> = placeholders
        .iter()
        .copied()
        .filter(|name| !UI_URL_PLACEHOLDERS.contains(name))
        .collect();
    if !unknown.is_empty() {
        return vec![format!(
            "{location}.url has unknown placeholders: {}",
            format_placeholders(&unknown)
        )];
    }
    if !has_domain && placeholders.iter().any(|name| UI_DOMAIN_PLACEHOLDERS.contains(name)) {
        return vec![format!(
            "{location}.url uses the domain, so the manifest needs a domain"
        )];
    }
    Vec::new()
}
