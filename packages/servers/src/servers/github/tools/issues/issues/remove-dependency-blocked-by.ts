import { defineTool } from "@usemcpkit/core";

export const issuesIssuesRemoveDependencyBlockedBy = defineTool({
  name: "issues:issues:remove_dependency_blocked_by",
  description:
    "Remove dependency an issue is blocked by. You can use the REST API to remove a dependency that an issue is blocked by.",
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
      issue_number: {
        type: "integer",
        description: "The number that identifies the issue.",
      },
      issue_id: {
        type: "integer",
        description: "The id of the blocking issue to remove as a dependency",
      },
    },
    required: ["owner", "repo", "issue_number", "issue_id"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by/{issue_id}",
  },
});
