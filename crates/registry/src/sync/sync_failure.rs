#[derive(Clone, Debug, PartialEq, Eq)]
pub struct SyncFailure {
    pub id: String,
    pub error: String,
}
