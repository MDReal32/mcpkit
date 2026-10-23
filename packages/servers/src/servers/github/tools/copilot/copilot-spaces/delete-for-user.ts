import { defineTool } from "@usemcpkit/core";

export const copilotCopilotSpacesDeleteForUser = defineTool({
  name: "copilot:copilot_spaces:delete_for_user",
  description:
    "Delete a Copilot Space for a user. Deletes a Copilot Space owned by a user. The authenticated user must be the owner of the space.",
  input: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "The handle for the GitHub user account.",
      },
      space_number: {
        type: "integer",
        description: "The unique identifier of the Copilot Space.",
      },
    },
    required: ["username", "space_number"],
  },
  request: {
    method: "DELETE",
    path: "/users/{username}/copilot-spaces/{space_number}",
  },
});
