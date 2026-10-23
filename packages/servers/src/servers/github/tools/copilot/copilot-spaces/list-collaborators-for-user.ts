import { defineTool } from "@usemcpkit/core";

export const copilotCopilotSpacesListCollaboratorsForUser = defineTool({
  name: "copilot:copilot_spaces:list_collaborators_for_user",
  description:
    "List collaborators for a Copilot Space for a user. Lists all collaborators for a specific Copilot Space owned by a user. The authenticated user must be the owner of the space or have admin access to the space.",
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
    method: "GET",
    path: "/users/{username}/copilot-spaces/{space_number}/collaborators",
  },
});
