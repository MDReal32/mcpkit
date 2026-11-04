use crate::mcp::consts::SERVER_NAME;

/// The API refuses tool names over 64 characters, and the client puts `mcp__<server>__` in front of ours.
const MAX_CLIENT_TOOL_NAME_LENGTH: usize = 64;

const CLIENT_TOOL_PREFIX_LENGTH: usize = "mcp__".len() + SERVER_NAME.len() + "__".len();

pub const MAX_TOOL_NAME_LENGTH: usize = MAX_CLIENT_TOOL_NAME_LENGTH - CLIENT_TOOL_PREFIX_LENGTH;

pub const NAME_PART_SEPARATOR: char = '_';

pub const HASH_LENGTH: usize = 6;

pub const SECTION_NOTICE: &str = "This is a SECTION of usemcpkit, not a callable tool.";
