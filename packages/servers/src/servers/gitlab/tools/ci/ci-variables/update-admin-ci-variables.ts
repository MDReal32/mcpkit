import { defineTool } from "@usemcpkit/core";

export const ciCiVariablesUpdateAdminCiVariables = defineTool({
  name: "ci:ci_variables:update_admin_ci_variables",
  description: "Update an instance variable. Updates a specified instance variable.",
  input: {
    type: "object",
    properties: {
      key: {
        type: "string",
        description:
          "Key of the instance variable. Must be 255 characters or fewer and contain only `A-Z`, `a-z`, `0-9`, and `_`.",
      },
      description: {
        type: "string",
        description: "Description of the variable. Limited to 255 characters.",
      },
      value: {
        type: "string",
        description: "Value of the variable. Limited to 10,000 characters, or 50,000 characters for `file` variables.",
      },
      protected: {
        type: "boolean",
        description: "If `true`, the variable is protected.",
      },
      masked: {
        type: "boolean",
        description: "If `true`, the variable is masked.",
      },
      raw: {
        type: "boolean",
        description: "If `true`, the variable is treated as a raw string. If `false`, the value is expanded.",
      },
      variable_type: {
        type: "string",
        description: "The type of a variable. Available types are: env_var (default) and file",
        enum: ["env_var", "file"],
      },
    },
    required: ["key"],
  },
  request: {
    method: "PUT",
    path: "/admin/ci/variables/{key}",
    body: ["description", "value", "protected", "masked", "raw", "variable_type"],
  },
});
