import { defineTool } from "@usemcpkit/core";

export const ciCiVariablesCreateAdminCiVariables = defineTool({
  name: "ci:ci_variables:create_admin_ci_variables",
  description:
    "Create instance variable. Creates a instance-level variable. The maximum number of instance-level variables can be changed.",
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
        description: "The type of a variable.",
        default: "env_var",
        enum: ["env_var", "file"],
      },
    },
    required: ["key", "value"],
  },
  request: {
    method: "POST",
    path: "/admin/ci/variables",
    body: ["key", "description", "value", "protected", "masked", "raw", "variable_type"],
  },
});
