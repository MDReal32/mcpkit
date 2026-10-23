import { defineTool } from "@usemcpkit/core";

export const appsCodespacesDeleteRepoSecret = defineTool({
  name: "apps:codespaces:delete_repo_secret",
  description:
    "Delete a repository secret. Deletes a development environment secret in a repository using the secret name.",
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
      secret_name: {
        type: "string",
        description: "The name of the secret.",
      },
    },
    required: ["owner", "repo", "secret_name"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/codespaces/secrets/{secret_name}",
  },
});
