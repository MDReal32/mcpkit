import { defineTool } from "@usemcpkit/core";

export const projectsKeysGetUserKeys = defineTool({
  name: "projects:keys:get_user_keys",
  description: "Retrieve an SSH key. Retrieves a specified SSH key for the currently authenticated user.",
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
    method: "GET",
    path: "/user/keys/{key_id}",
  },
});
