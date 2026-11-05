/// When the last update check finished, in milliseconds since the epoch; 0 when there was none.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct UpdateState {
    pub checked_at: f64,
}
