import { defineTool } from "@usemcpkit/core";

export const securityGroupCredentialsInventoryDeleteGroupsManageResourceAccessTokens = defineTool({
  name: "security:group_credentials_inventory:delete_groups_manage_resource_access_tokens",
  description:
    "Revoke a group or project access token for a group. Revokes a specified group or project access token associated with a top-level group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      prat_id: {
        type: "integer",
        description: "ID of the resource access token.",
      },
      expires_at: {
        type: "string",
        description:
          "Date when the access token expires. If omitted, the new token expires one week after rotation when token expiry is enforced, and does not expire otherwise. When expiry is enforced, the date must be no more than one year after rotation.",
      },
    },
    required: ["id", "prat_id"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/manage/resource_access_tokens/{prat_id}",
    query: ["expires_at"],
  },
});
