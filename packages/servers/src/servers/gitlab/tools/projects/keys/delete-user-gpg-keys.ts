import { defineTool } from "@usemcpkit/core";

export const projectsKeysDeleteUserGpgKeys = defineTool({
  name: "projects:keys:delete_user_gpg_keys",
  description: "Delete a GPG key. Deletes a GPG key from your user account.",
  input: {
    type: "object",
    properties: {
      key_id: {
        type: "integer",
        description: "ID of the GPG key.",
      },
    },
    required: ["key_id"],
  },
  request: {
    method: "DELETE",
    path: "/user/gpg_keys/{key_id}",
  },
});
