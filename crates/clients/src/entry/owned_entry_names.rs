use crate::consts::{ENTRY_NAME, LEGACY_ENTRY_NAMES};

/// The current entry name followed by the ones older releases wrote.
pub fn owned_entry_names() -> Vec<&'static str> {
    std::iter::once(ENTRY_NAME)
        .chain(LEGACY_ENTRY_NAMES.iter().copied())
        .collect()
}
