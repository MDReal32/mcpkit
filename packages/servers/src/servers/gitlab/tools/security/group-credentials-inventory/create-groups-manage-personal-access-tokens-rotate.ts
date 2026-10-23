import { defineTool } from "@usemcpkit/core";

export const securityGroupCredentialsInventoryCreateGroupsManagePersonalAccessTokensRotate = defineTool({
  name: "security:group_credentials_inventory:create_groups_manage_personal_access_tokens_rotate",
  description:
    "Rotate a personal access token for an enterprise user. Rotates a specified personal access token for an enterprise user associated with the top-level group. This revokes the previous token and creates a token that expires after one week.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      pat_id: {
        type: "integer",
        description: "ID of the personal access token.",
      },
      expires_at: {
        type: "string",
        description:
          "Date when the access token expires. If omitted, the new token expires one week after rotation when token expiry is enforced, and does not expire otherwise. When expiry is enforced, the date must be no more than one year after rotation.",
      },
    },
    required: ["id", "pat_id"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/manage/personal_access_tokens/{pat_id}/rotate",
    body: ["expires_at"],
  },
});
