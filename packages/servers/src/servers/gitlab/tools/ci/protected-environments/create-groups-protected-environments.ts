import { defineTool } from "@usemcpkit/core";

export const ciProtectedEnvironmentsCreateGroupsProtectedEnvironments = defineTool({
  name: "ci:protected_environments:create_groups_protected_environments",
  description: "Protect an environment for a group. Protects a specified environment for a group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      name: {
        type: "string",
        description: "The deployment tier of the protected environment.",
        enum: ["production", "staging", "testing", "development", "other"],
      },
      required_approval_count: {
        type: "integer",
        description:
          "Number of approvals required to deploy to the environment. Values greater than `0` are rejected. Deprecated. Use `approval_rules` instead.",
        default: 0,
      },
      deploy_access_levels: {
        type: "array",
        description:
          "Array of access levels allowed to deploy to the environment, with each entry specifying a user, group, or access level.",
        items: {
          type: "object",
          properties: {
            user_id: {
              type: "integer",
              description: "ID of the user to grant access to.",
            },
            group_id: {
              type: "integer",
              description: "ID of the group to grant access to.",
            },
            group_inheritance_type: {
              type: "integer",
              description:
                "Whether to include inherited group membership. Use `0` for direct group membership only, or `1` to include inherited groups. Defaults to `0`.",
              enum: [0, 1],
            },
            access_level: {
              type: "integer",
              description: "Access level allowed to deploy to the environment.",
              enum: [40, 30, 20, 60],
            },
          },
        },
      },
      approval_rules: {
        type: "array",
        description:
          "Array of access levels allowed to approve deployments to the environment, with each entry specifying a user, group, or access level. Use `required_approvals` to set the number of approvals required from each entry.",
        items: {
          type: "object",
          properties: {
            user_id: {
              type: "integer",
              description: "ID of the user to grant access to.",
            },
            group_id: {
              type: "integer",
              description: "ID of the group to grant access to.",
            },
            group_inheritance_type: {
              type: "integer",
              description:
                "Whether to include inherited group membership. Use `0` for direct group membership only, or `1` to include inherited groups. Defaults to `0`.",
              enum: [0, 1],
            },
            id: {
              type: "integer",
              description: "ID of an existing entry to update.",
            },
            _destroy: {
              type: "boolean",
              description: "If `true`, deletes the object.",
            },
            access_level: {
              type: "integer",
              description: "Access level allowed to approve deployments to the environment.",
              enum: [40, 30, 20, 60],
            },
            required_approvals: {
              type: "integer",
              description: "Number of approvals required for this rule.",
              default: 1,
            },
          },
        },
      },
    },
    required: ["id", "name", "deploy_access_levels"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/protected_environments",
    body: ["name", "required_approval_count", "deploy_access_levels", "approval_rules"],
  },
});
