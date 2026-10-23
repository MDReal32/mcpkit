import { defineTool } from "@usemcpkit/core";

export const actionsActionsDeleteEnvironmentVariable = defineTool({
  name: "actions:actions:delete_environment_variable",
  description: "Delete an environment variable. Deletes an environment variable using the variable name.",
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
        description: "The name of the variable.",
      },
      environment_name: {
        type: "string",
        description:
          "The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`.",
      },
    },
    required: ["owner", "repo", "name", "environment_name"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/environments/{environment_name}/variables/{name}",
  },
});
