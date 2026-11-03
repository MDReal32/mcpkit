use crate::args::ArgValue;
use indexmap::IndexMap;

/// The arguments of a call once defaults are applied and file paths are read, in the order JavaScript would keep them.
pub type ToolArgs = IndexMap<String, ArgValue>;
