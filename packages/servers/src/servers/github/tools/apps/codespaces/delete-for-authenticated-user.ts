import { defineTool } from "@usemcpkit/core";

export const appsCodespacesDeleteForAuthenticatedUser = defineTool({
  name: "apps:codespaces:delete_for_authenticated_user",
  description: "Delete a codespace for the authenticated user. Deletes a user's codespace.",
  input: {
    type: "object",
    properties: {
      codespace_name: {
        type: "string",
        description: "The name of the codespace.",
      },
    },
    required: ["codespace_name"],
  },
  request: {
    method: "DELETE",
    path: "/user/codespaces/{codespace_name}",
  },
});
