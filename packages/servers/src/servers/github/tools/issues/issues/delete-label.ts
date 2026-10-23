import { defineTool } from "@usemcpkit/core";

export const issuesIssuesDeleteLabel = defineTool({
  name: "issues:issues:delete_label",
  description: "Delete a label. Deletes a label using the given label name.",
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
      name: {
        type: "string",
      },
    },
    required: ["owner", "repo", "name"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/labels/{name}",
  },
});
