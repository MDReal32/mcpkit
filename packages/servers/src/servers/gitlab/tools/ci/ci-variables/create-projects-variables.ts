import { defineTool } from "@usemcpkit/core";

export const ciCiVariablesCreateProjectsVariables = defineTool({
  name: "ci:ci_variables:create_projects_variables",
  description:
    "Create a variable. Creates a variable. If a variable with the same `key` already exists, the variable must have a different `environment_scope`. Otherwise, GitLab returns a message similar to: `VARIABLE_NAME has already been taken`.",
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
      value: {
        type: "string",
        description: "Value of the variable.",
      },
      protected: {
        type: "boolean",
        description: "If `true`, the variable is protected.",
      },
      masked: {
        type: "boolean",
        description: "If `true`, the variable is masked.",
      },
      masked_and_hidden: {
        type: "boolean",
        description: "If `true`, the variable is masked and hidden. Introduced in GitLab 17.4.",
      },
      raw: {
        type: "boolean",
        description: "If `true`, the variable is treated as a raw string. If `false`, the value is expanded.",
      },
      variable_type: {
        type: "string",
        description: "The type of the variable.",
        default: "env_var",
        enum: ["env_var", "file"],
      },
      environment_scope: {
        type: "string",
        description: "Environment scope of the variable. Defaults to `*`.",
      },
      description: {
        type: "string",
        description: "Description of the variable. Limited to 255 characters.",
      },
    },
    required: ["id", "key", "value"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/variables",
    body: [
      "key",
      "value",
      "protected",
      "masked",
      "masked_and_hidden",
      "raw",
      "variable_type",
      "environment_scope",
      "description",
    ],
  },
});
