import { defineTool } from "@usemcpkit/core";

export const actionsActionsGetEnvironmentVariable = defineTool({
  name: "actions:actions:get_environment_variable",
  description: "Get an environment variable. Gets a specific variable in an environment.",
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
      name: {
        type: "string",
        description: "The name of the variable.",
      },
    },
    required: ["owner", "repo", "environment_name", "name"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/environments/{environment_name}/variables/{name}",
  },
});
