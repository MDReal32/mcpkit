import { defineTool } from "@usemcpkit/core";

export const issuesIssuesSetLabels = defineTool({
  name: "issues:issues:set_labels",
  description: "Set labels for an issue. Removes any previous labels and sets the new labels for an issue.",
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
      labels: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
          },
          required: ["name"],
        },
      },
    },
    required: ["owner", "repo", "issue_number"],
  },
  request: {
    method: "PUT",
    path: "/repos/{owner}/{repo}/issues/{issue_number}/labels",
    body: ["labels"],
  },
});
