import { defineTool } from "@usemcpkit/core";

export const securityGroupCredentialsInventoryDeleteGroupsManageSshKeys = defineTool({
  name: "security:group_credentials_inventory:delete_groups_manage_ssh_keys",
  description:
    "Delete an SSH key for an enterprise user. Deletes a specified SSH public key for an enterprise user associated with the top-level group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      key_id: {
        type: "integer",
        description: "ID of the SSH key.",
      },
    },
    required: ["id", "key_id"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/manage/ssh_keys/{key_id}",
  },
});
