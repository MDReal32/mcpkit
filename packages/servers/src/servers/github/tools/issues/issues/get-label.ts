import { defineTool } from "@usemcpkit/core";

export const issuesIssuesGetLabel = defineTool({
  name: "issues:issues:get_label",
  description: "Get a label. Gets a label using the given name.",
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
    method: "GET",
    path: "/repos/{owner}/{repo}/labels/{name}",
  },
});
