use crate::mcp::consts::TOOL_ID_SEPARATOR;
use crate::mcp::exposed::consts::{HASH_LENGTH, MAX_TOOL_NAME_LENGTH, NAME_PART_SEPARATOR};
use crate::mcp::exposed::cut_at_word_boundary::cut_at_word_boundary;
use crate::mcp::exposed::drop_repeated_parts::drop_repeated_parts;
use crate::mcp::exposed::sanitize_name_characters::sanitize_name_characters;
use usemcpkit_core::hash::sha256_hex;

/// `git:github` with `issues:issues:get_issue` is `git_github_issues_get_issue`: a group and resource that repeat each
/// other are named once. A name that does not fit is cut at a word boundary and ends in a hash of the full id, so it
/// stays the same from run to run and the client's permission rules keep matching. An empty `tool` names a server
/// section: `git:github` is `git_github`. `attempt` is bumped by the caller when two tools land on the same name.
pub fn create_tool_name(server_id: &str, tool: &str, attempt: u32) -> String {
    let id = format!("{server_id}{TOOL_ID_SEPARATOR}{tool}");
    let tool_parts: Vec<&str> = tool.split(TOOL_ID_SEPARATOR).filter(|part| !part.is_empty()).collect();
    let parts: Vec<&str> = server_id
        .split(TOOL_ID_SEPARATOR)
        .chain(drop_repeated_parts(&tool_parts))
        .collect();
    let name = sanitize_name_characters(&parts.join(&NAME_PART_SEPARATOR.to_string()));
    if attempt == 0 && name.len() <= MAX_TOOL_NAME_LENGTH {
        return name;
    }
    let hashed = if attempt == 0 { id } else { format!("{id}#{attempt}") };
    let suffix = format!("{NAME_PART_SEPARATOR}{}", &sha256_hex(hashed)[..HASH_LENGTH]);
    format!(
        "{}{suffix}",
        cut_at_word_boundary(&name, MAX_TOOL_NAME_LENGTH - suffix.len())
    )
}

#[cfg(test)]
mod tests {
    use super::create_tool_name;

    const MAX_NAME_LENGTH: usize = 51;

    #[test]
    fn joins_the_server_id_and_the_tool_name() {
        assert_eq!(
            create_tool_name("git:github", "pulls:comments:list", 0),
            "git_github_pulls_comments_list"
        );
        assert_eq!(
            create_tool_name("git:github", "issues:issues:get_issue", 0),
            "git_github_issues_get_issue"
        );
        assert_eq!(create_tool_name("git:github", "", 0), "git_github");
    }

    #[test]
    fn shortens_a_long_name_to_fit_keeping_a_stable_hash_of_the_full_id() {
        let tool = "actions:workflow_runs:get_workflow_run_usage_for_a_repository_run";

        let name = create_tool_name("git:github", tool, 0);

        assert!(name.len() <= MAX_NAME_LENGTH);
        assert!(name.starts_with("git_github_actions_workflow_runs_"));
        let hash = &name[name.len() - 6..];
        assert!(hash.chars().all(|character| character.is_ascii_hexdigit()));
        assert_eq!(create_tool_name("git:github", tool, 0), name);
    }

    #[test]
    fn gives_a_different_name_on_another_attempt() {
        assert_ne!(create_tool_name("a:b", "c:d", 1), create_tool_name("a:b", "c:d", 0));
    }
}
