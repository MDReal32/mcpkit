import { defineTool } from "@usemcpkit/core";

export const securityAccessTokensCreateUsersImpersonationTokens = defineTool({
  name: "security:access_tokens:create_users_impersonation_tokens",
  description:
    "Create an impersonation token. Creates an impersonation token. These tokens are used to act on behalf of a user and can perform API calls as well as Git read and write actions. These tokens are not visible to the associated user on their profile settings page. Token values are included with the response, but cannot be retrieved later. Administrators only.",
  input: {
    type: "object",
    properties: {
      user_id: {
        type: "integer",
        description: "ID of the user.",
      },
      name: {
        type: "string",
        description: "Name of the impersonation token.",
      },
      description: {
        type: "string",
        description: "Description of the impersonation token. Limited to 255 characters.",
      },
      expires_at: {
        type: "string",
        description:
          "Date when the impersonation token expires. If omitted, the token does not expire, which is accepted only when token expiry is not enforced.",
      },
      scopes: {
        type: "array",
        description:
          "Array of approved scopes. For a list of possible values, see access token scopes. Mutually exclusive with `granular_scopes`.",
        items: {
          type: "string",
        },
      },
      granular_scopes: {
        type: "array",
        description: "List of granular scopes to assign. Mutually exclusive with `scopes`.",
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
    },
    required: ["user_id", "name"],
  },
  request: {
    method: "POST",
    path: "/users/{user_id}/impersonation_tokens",
    body: ["name", "description", "expires_at", "scopes", "granular_scopes"],
  },
});
