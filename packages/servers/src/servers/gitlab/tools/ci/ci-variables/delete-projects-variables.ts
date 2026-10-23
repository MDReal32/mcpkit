import { defineTool } from "@usemcpkit/core";

export const ciCiVariablesDeleteProjectsVariables = defineTool({
  name: "ci:ci_variables:delete_projects_variables",
  description:
    "Delete a variable. Deletes a project variable. If there are multiple variables with the same key, use `filter` to select the correct `environment_scope`.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      key: {
        type: "string",
        description:
          "Key of the project variable. Must be 255 characters or fewer and contain only `A-Z`, `a-z`, `0-9`, and `_`.",
      },
      filter: {
        type: "object",
        description: "Filter results when multiple variables share the same key.",
      },
      filter_environment_scope: {
        type: "string",
        description: "Environment scope of the variable.",
      },
    },
    required: ["id", "key"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/variables/{key}",
    query: {
      filter: "filter",
      "filter[environment_scope]": "filter_environment_scope",
    },
  },
});
