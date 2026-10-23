import { defineTool } from "@usemcpkit/core";

export const projectsPushRulesUpdateProjectsPushRule = defineTool({
  name: "projects:push_rules:update_projects_push_rule",
  description: "Update push rules of a project. Updates the push rules for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      deny_delete_tag: {
        type: "boolean",
        description:
          "If `true`, denies deleting a tag. At least one of `deny_delete_tag`, `member_check`, `prevent_secrets`, `commit_message_regex`, `commit_message_negative_regex`, `branch_name_regex`, `author_email_regex`, `file_name_regex`, `max_file_size`, `commit_committer_check`, `commit_committer_name_check`, `reject_unsigned_commits`, `reject_non_dco_commits` must be provided.",
      },
      member_check: {
        type: "boolean",
        description:
          "If `true`, restricts commits by author email to existing GitLab users. At least one of `deny_delete_tag`, `member_check`, `prevent_secrets`, `commit_message_regex`, `commit_message_negative_regex`, `branch_name_regex`, `author_email_regex`, `file_name_regex`, `max_file_size`, `commit_committer_check`, `commit_committer_name_check`, `reject_unsigned_commits`, `reject_non_dco_commits` must be provi…",
      },
      prevent_secrets: {
        type: "boolean",
        description:
          "If `true`, rejects files that are likely to contain secrets. At least one of `deny_delete_tag`, `member_check`, `prevent_secrets`, `commit_message_regex`, `commit_message_negative_regex`, `branch_name_regex`, `author_email_regex`, `file_name_regex`, `max_file_size`, `commit_committer_check`, `commit_committer_name_check`, `reject_unsigned_commits`, `reject_non_dco_commits` must be provided.",
      },
      commit_message_regex: {
        type: "string",
        description:
          "Regular expression that commit messages must match, for example `Fixed \\d+\\..*`. At least one of `deny_delete_tag`, `member_check`, `prevent_secrets`, `commit_message_regex`, `commit_message_negative_regex`, `branch_name_regex`, `author_email_regex`, `file_name_regex`, `max_file_size`, `commit_committer_check`, `commit_committer_name_check`, `reject_unsigned_commits`, `reject_non_dco_commits` mus…",
      },
      commit_message_negative_regex: {
        type: "string",
        description:
          "Regular expression that commit messages must not match. At least one of `deny_delete_tag`, `member_check`, `prevent_secrets`, `commit_message_regex`, `commit_message_negative_regex`, `branch_name_regex`, `author_email_regex`, `file_name_regex`, `max_file_size`, `commit_committer_check`, `commit_committer_name_check`, `reject_unsigned_commits`, `reject_non_dco_commits` must be provided.",
      },
      branch_name_regex: {
        type: "string",
        description:
          "Regular expression that branch names must match. At least one of `deny_delete_tag`, `member_check`, `prevent_secrets`, `commit_message_regex`, `commit_message_negative_regex`, `branch_name_regex`, `author_email_regex`, `file_name_regex`, `max_file_size`, `commit_committer_check`, `commit_committer_name_check`, `reject_unsigned_commits`, `reject_non_dco_commits` must be provided.",
      },
      author_email_regex: {
        type: "string",
        description:
          "Regular expression that commit author emails must match, for example `@my-company.com$`. At least one of `deny_delete_tag`, `member_check`, `prevent_secrets`, `commit_message_regex`, `commit_message_negative_regex`, `branch_name_regex`, `author_email_regex`, `file_name_regex`, `max_file_size`, `commit_committer_check`, `commit_committer_name_check`, `reject_unsigned_commits`, `reject_non_dco_comm…",
      },
      file_name_regex: {
        type: "string",
        description:
          "Regular expression that committed filenames must not match. At least one of `deny_delete_tag`, `member_check`, `prevent_secrets`, `commit_message_regex`, `commit_message_negative_regex`, `branch_name_regex`, `author_email_regex`, `file_name_regex`, `max_file_size`, `commit_committer_check`, `commit_committer_name_check`, `reject_unsigned_commits`, `reject_non_dco_commits` must be provided.",
      },
      max_file_size: {
        type: "integer",
        description:
          "Maximum file size allowed, in MB. At least one of `deny_delete_tag`, `member_check`, `prevent_secrets`, `commit_message_regex`, `commit_message_negative_regex`, `branch_name_regex`, `author_email_regex`, `file_name_regex`, `max_file_size`, `commit_committer_check`, `commit_committer_name_check`, `reject_unsigned_commits`, `reject_non_dco_commits` must be provided.",
      },
      commit_committer_check: {
        type: "boolean",
        description:
          "If `true`, users can push commits only if the committer email is one of their own verified emails. At least one of `deny_delete_tag`, `member_check`, `prevent_secrets`, `commit_message_regex`, `commit_message_negative_regex`, `branch_name_regex`, `author_email_regex`, `file_name_regex`, `max_file_size`, `commit_committer_check`, `commit_committer_name_check`, `reject_unsigned_commits`, `reject_no…",
      },
      commit_committer_name_check: {
        type: "boolean",
        description:
          "If `true`, users can push commits only if the commit author name is consistent with their GitLab account name. At least one of `deny_delete_tag`, `member_check`, `prevent_secrets`, `commit_message_regex`, `commit_message_negative_regex`, `branch_name_regex`, `author_email_regex`, `file_name_regex`, `max_file_size`, `commit_committer_check`, `commit_committer_name_check`, `reject_unsigned_commits`…",
      },
      reject_unsigned_commits: {
        type: "boolean",
        description:
          "If `true`, rejects commits that are not signed. At least one of `deny_delete_tag`, `member_check`, `prevent_secrets`, `commit_message_regex`, `commit_message_negative_regex`, `branch_name_regex`, `author_email_regex`, `file_name_regex`, `max_file_size`, `commit_committer_check`, `commit_committer_name_check`, `reject_unsigned_commits`, `reject_non_dco_commits` must be provided.",
      },
      reject_non_dco_commits: {
        type: "boolean",
        description:
          "If `true`, rejects commits that are not DCO certified. At least one of `deny_delete_tag`, `member_check`, `prevent_secrets`, `commit_message_regex`, `commit_message_negative_regex`, `branch_name_regex`, `author_email_regex`, `file_name_regex`, `max_file_size`, `commit_committer_check`, `commit_committer_name_check`, `reject_unsigned_commits`, `reject_non_dco_commits` must be provided.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/push_rule",
    body: [
      "deny_delete_tag",
      "member_check",
      "prevent_secrets",
      "commit_message_regex",
      "commit_message_negative_regex",
      "branch_name_regex",
      "author_email_regex",
      "file_name_regex",
      "max_file_size",
      "commit_committer_check",
      "commit_committer_name_check",
      "reject_unsigned_commits",
      "reject_non_dco_commits",
    ],
  },
});
