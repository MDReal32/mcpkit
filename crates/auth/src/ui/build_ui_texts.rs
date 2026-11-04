use indexmap::IndexMap;
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::ui::{DEFAULT_UI_TEXTS, fill_template};

/// The manifest's texts over the defaults, with the server's name filled in.
pub fn build_ui_texts(manifest: &Manifest) -> IndexMap<String, String> {
    let mut texts: IndexMap<String, String> = DEFAULT_UI_TEXTS
        .iter()
        .map(|(key, text)| ((*key).to_owned(), (*text).to_owned()))
        .collect();
    texts.extend(
        manifest
            .ui
            .as_ref()
            .and_then(|ui| ui.texts.as_ref())
            .into_iter()
            .flatten()
            .map(|(key, text)| (key.clone(), text.clone())),
    );
    for (key, _) in DEFAULT_UI_TEXTS {
        if let Some(text) = texts.get_mut(*key) {
            *text = fill_template(text, &[("server", &manifest.name)]);
        }
    }
    texts
}
