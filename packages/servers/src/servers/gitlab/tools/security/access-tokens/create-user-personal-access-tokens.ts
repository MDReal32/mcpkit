import { defineTool } from "@usemcpkit/core";

export const securityAccessTokensCreateUserPersonalAccessTokens = defineTool({
  name: "security:access_tokens:create_user_personal_access_tokens",
  description:
    "Create a personal access token. Creates a personal access token for the currently authenticated user. For security purposes, the token is limited to the `k8s_proxy` and `self_rotate` scope. Token values are included with the response, but cannot be retrieved later. This feature was introduced in GitLab 16.5.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the access token.",
      },
      description: {
        type: "string",
        description: "Description of the access token. Limited to 255 characters.",
      },
      expires_at: {
        type: "string",
        description:
          "Expiration date of the access token in ISO format (YYYY-MM-DD). If undefined, the date is set to the maximum allowable lifetime limit.",
      },
      granular_scopes: {
        type: "array",
        description: "List of granular scopes to assign. Exactly one of `scopes`, `granular_scopes` must be provided.",
        items: {
          type: "object",
          properties: {
            access: {
              type: "string",
              description: "Access to configure for the granular scope.",
              enum: ["personal_projects", "all_memberships", "selected_memberships", "user", "instance"],
            },
            permissions: {
              type: "array",
              description: "List of permissions for the granular scope.",
              items: {
                type: "string",
              },
            },
            project_ids: {
              type: "array",
              description:
                "IDs of projects to associate with the granular scope, when access is `selected_memberships`.",
              items: {
                type: "integer",
              },
            },
            group_ids: {
              type: "array",
              description: "IDs of groups to associate with the granular scope, when access is `selected_memberships`.",
              items: {
                type: "integer",
              },
            },
          },
          required: ["access", "permissions"],
        },
      },
      scopes: {
        type: "array",
        description:
          "Array of approved scopes. For a list of possible values, see access token scopes. Exactly one of `scopes`, `granular_scopes` must be provided.",
        items: {
          type: "string",
          enum: ["k8s_proxy", "self_rotate"],
        },
      },
    },
    required: ["name"],
  },
  request: {
    method: "POST",
    path: "/user/personal_access_tokens",
    body: ["name", "description", "expires_at", "granular_scopes", "scopes"],
  },
});
