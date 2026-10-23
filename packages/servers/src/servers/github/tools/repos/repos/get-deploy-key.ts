import { defineTool } from "@usemcpkit/core";

export const reposReposGetDeployKey = defineTool({
  name: "repos:repos:get_deploy_key",
  description: "Get a deploy key",
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
      key_id: {
        type: "integer",
        description: "The unique identifier of the key.",
      },
    },
    required: ["owner", "repo", "key_id"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/keys/{key_id}",
  },
});
