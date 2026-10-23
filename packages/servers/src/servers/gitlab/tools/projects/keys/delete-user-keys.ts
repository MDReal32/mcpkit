import { defineTool } from "@usemcpkit/core";

export const projectsKeysDeleteUserKeys = defineTool({
  name: "projects:keys:delete_user_keys",
  description: "Delete an SSH key. Deletes a specified SSH key from the currently authenticated user.",
  input: {
    type: "object",
    properties: {
      key_id: {
        type: "integer",
        description: "ID of the SSH key.",
      },
    },
    required: ["key_id"],
  },
  request: {
    method: "DELETE",
    path: "/user/keys/{key_id}",
  },
});
