use usemcpkit_core::js::encode_uri_component;
use usemcpkit_manifest::ui::{UiAction, UiSpec, fill_template};

/// `{server}` is known when the form opens; the domain can still change while it is open. A CLI prints one token, so
/// its button is only kept for an entry with one field.
pub fn to_option_actions(ui: Option<&UiSpec>, server_name: &str, field_count: usize) -> Vec<UiAction> {
    let server = encode_uri_component(server_name);
    ui.and_then(|ui| ui.actions.as_ref())
        .into_iter()
        .flatten()
        .filter_map(|action| match action {
            UiAction::Cli { .. } => (field_count == 1).then(|| action.clone()),
            UiAction::Link { label, url } => Some(UiAction::Link {
                label: label.clone(),
                url: fill_template(url, &[("server", &server)]),
            }),
        })
        .collect()
}
