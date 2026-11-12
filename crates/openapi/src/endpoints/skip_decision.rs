/// Whether an endpoint becomes a tool.
#[derive(Clone, Debug, PartialEq, Eq)]
pub enum SkipDecision {
    Keep,
    /// Left out on purpose by the source's options; not reported.
    Excluded,
    /// It cannot become a tool, for the reason given.
    Unsupported(String),
}
