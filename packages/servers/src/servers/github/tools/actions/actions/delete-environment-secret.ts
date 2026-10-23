import { defineTool } from "@usemcpkit/core";

export const actionsActionsDeleteEnvironmentSecret = defineTool({
  name: "actions:actions:delete_environment_secret",
  description: "Delete an environment secret. Deletes a secret in an environment using the secret name.",
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
      environment_name: {
        type: "string",
        description:
          "The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`.",
      },
      secret_name: {
        type: "string",
        description: "The name of the secret.",
      },
    },
    required: ["owner", "repo", "environment_name", "secret_name"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}",
  },
});
