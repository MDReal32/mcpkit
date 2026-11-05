use crate::consts::UPDATE_GOLDENS_ENV;

/// True when `UPDATE_GOLDENS=1` is set, so a golden test writes what it got to its fixture instead of comparing.
pub fn updates_goldens() -> bool {
    std::env::var(UPDATE_GOLDENS_ENV).is_ok_and(|value| value == "1")
}
