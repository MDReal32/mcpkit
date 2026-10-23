import { defineTool } from "@usemcpkit/core";

export const securityGroupCredentialsInventoryDeleteGroupsManagePersonalAccessTokens = defineTool({
  name: "security:group_credentials_inventory:delete_groups_manage_personal_access_tokens",
  description:
    "Revoke a personal access token for an enterprise user. Revokes a specified personal access token for an enterprise user.",
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
    },
    required: ["id", "pat_id"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/manage/personal_access_tokens/{pat_id}",
  },
});
