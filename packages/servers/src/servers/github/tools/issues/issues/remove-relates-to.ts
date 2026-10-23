import { defineTool } from "@usemcpkit/core";

export const issuesIssuesRemoveRelatesTo = defineTool({
  name: "issues:issues:remove_relates_to",
  description:
    "Remove a related issue. You can use the REST API to remove a 'relates to' relationship between two issues.",
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
        description: "The id of the related issue to remove",
      },
    },
    required: ["owner", "repo", "issue_number", "issue_id"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/issues/{issue_number}/relates_to/{issue_id}",
  },
});
