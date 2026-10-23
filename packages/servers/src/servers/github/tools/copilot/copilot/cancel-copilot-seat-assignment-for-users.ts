import { defineTool } from "@usemcpkit/core";

export const copilotCopilotCancelCopilotSeatAssignmentForUsers = defineTool({
  name: "copilot:copilot:cancel_copilot_seat_assignment_for_users",
  description:
    "Remove users from the Copilot subscription for an organization. > [!NOTE] > This endpoint is in public preview and is subject to change.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      selected_usernames: {
        type: "array",
        description: "The usernames of the organization members for which to revoke access to GitHub Copilot.",
        items: {
          type: "string",
        },
      },
    },
    required: ["org", "selected_usernames"],
  },
  request: {
    method: "DELETE",
    path: "/orgs/{org}/copilot/billing/selected_users",
    body: ["selected_usernames"],
  },
});
