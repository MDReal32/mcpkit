use crate::credentials::CredentialField;
use crate::credentials::request::to_credential_field::to_credential_field;
use indexmap::IndexMap;
use usemcpkit_manifest::auth::AuthSpec;
use usemcpkit_manifest::ui::fill_template;

/// The values a fallback entry takes, one field per env var; none for `none` and the sign-in.
pub fn list_credential_fields(auth: &AuthSpec, texts: &IndexMap<String, String>) -> Vec<CredentialField> {
    let text = |key: &str| texts.get(key).map_or("", String::as_str).to_owned();
    let input = |env: &str| auth.ui().and_then(|ui| ui.inputs.as_ref()?.get(env));
    let field = |env: &str, label: String, secret: bool| to_credential_field(env, label, secret, texts, input(env));
    match auth {
        AuthSpec::None | AuthSpec::OAuth(_) => Vec::new(),
        AuthSpec::Bearer(auth) => vec![field(&auth.env, text("tokenLabel"), true)],
        AuthSpec::Header(auth) => {
            let label = fill_template(&text("headerLabel"), &[("name", &auth.name)]);
            vec![field(&auth.env, label, true)]
        }
        AuthSpec::Query(auth) => {
            let label = fill_template(&text("queryLabel"), &[("name", &auth.name)]);
            vec![field(&auth.env, label, true)]
        }
        AuthSpec::Basic(auth) => vec![
            field(&auth.username_env, text("usernameLabel"), false),
            field(&auth.password_env, text("passwordLabel"), true),
        ],
    }
}
