use crate::credentials::CredentialField;
use indexmap::IndexMap;
use usemcpkit_manifest::ui::{UiInputSpec, fill_template};

pub fn to_credential_field(
    key: &str,
    label: String,
    secret: bool,
    texts: &IndexMap<String, String>,
    spec: Option<&UiInputSpec>,
) -> CredentialField {
    let hint = texts.get("fieldHint").map_or("", String::as_str);
    CredentialField {
        key: key.to_owned(),
        label: spec.and_then(|spec| spec.label.clone()).unwrap_or(label),
        hint: spec
            .and_then(|spec| spec.hint.clone())
            .unwrap_or_else(|| fill_template(hint, &[("key", key)])),
        placeholder: spec.and_then(|spec| spec.placeholder.clone()).unwrap_or_default(),
        secret: spec.and_then(|spec| spec.secret).unwrap_or(secret),
    }
}
