import { defineTool } from "@usemcpkit/core";

export const actionsActionsUpdateEnvironmentVariable = defineTool({
  name: "actions:actions:update_environment_variable",
  description:
    "Update an environment variable. Updates an environment variable that you can reference in a GitHub Actions workflow.",
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
      body_name: {
        type: "string",
        description: "The name of the variable.",
      },
      value: {
        type: "string",
        description: "The value of the variable.",
      },
    },
    required: ["owner", "repo", "name", "environment_name"],
  },
  request: {
    method: "PATCH",
    path: "/repos/{owner}/{repo}/environments/{environment_name}/variables/{name}",
    body: {
      name: "body_name",
      value: "value",
    },
  },
});
