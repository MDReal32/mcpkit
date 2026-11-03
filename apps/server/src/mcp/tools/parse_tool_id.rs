use crate::mcp::consts::TOOL_ID_SEPARATOR;
use crate::mcp::tools::parsed_tool_id::ParsedToolId;

const SERVER_ID_PARTS: usize = 2;

pub fn parse_tool_id(id: &str) -> Option<ParsedToolId> {
    let parts: Vec<&str> = id.split(TOOL_ID_SEPARATOR).collect();
    let (server_parts, tool_parts) = parts.split_at_checked(SERVER_ID_PARTS)?;
    if server_parts.iter().any(|part| part.is_empty())
        || tool_parts.is_empty()
        || tool_parts.iter().any(|part| part.is_empty())
    {
        return None;
    }
    Some(ParsedToolId {
        server_id: server_parts.join(&TOOL_ID_SEPARATOR.to_string()),
        tool: tool_parts.join(&TOOL_ID_SEPARATOR.to_string()),
    })
}

#[cfg(test)]
mod tests {
    use super::parse_tool_id;

    #[test]
    fn splits_the_server_id_from_the_tool() {
        let parsed = parse_tool_id("git:github:pull_request:list").unwrap();

        assert_eq!(parsed.server_id, "git:github");
        assert_eq!(parsed.tool, "pull_request:list");
    }

    #[test]
    fn refuses_an_id_with_a_missing_part() {
        assert_eq!(parse_tool_id("git:github"), None);
        assert_eq!(parse_tool_id("git::list"), None);
        assert_eq!(parse_tool_id("git:github:a::b"), None);
    }
}
