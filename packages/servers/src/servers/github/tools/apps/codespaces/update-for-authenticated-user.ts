import { defineTool } from "@usemcpkit/core";

export const appsCodespacesUpdateForAuthenticatedUser = defineTool({
  name: "apps:codespaces:update_for_authenticated_user",
  description:
    "Update a codespace for the authenticated user. Updates a codespace owned by the authenticated user. Currently only the codespace's machine type and recent folders can be modified using this endpoint.",
  input: {
    type: "object",
    properties: {
      codespace_name: {
        type: "string",
        description: "The name of the codespace.",
      },
      machine: {
        type: "string",
        description: "A valid machine to transition this codespace to.",
      },
      display_name: {
        type: "string",
        description: "Display name for this codespace",
      },
      recent_folders: {
        type: "array",
        description:
          "Recently opened folders inside the codespace. It is currently used by the clients to determine the folder path to load the codespace in.",
        items: {
          type: "string",
        },
      },
    },
    required: ["codespace_name"],
  },
  request: {
    method: "PATCH",
    path: "/user/codespaces/{codespace_name}",
    body: ["machine", "display_name", "recent_folders"],
  },
});
