/// Where a `[table]` sits among the lines of a TOML file.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct TomlTableRange {
    /// Index of the `[table]` header line.
    pub start: usize,
    /// Index of the first line after the table body.
    pub end: usize,
}
