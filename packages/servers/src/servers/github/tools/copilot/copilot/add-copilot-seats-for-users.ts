import { defineTool } from "@usemcpkit/core";

export const copilotCopilotAddCopilotSeatsForUsers = defineTool({
  name: "copilot:copilot:add_copilot_seats_for_users",
  description:
    "Add users to the Copilot subscription for an organization. > [!NOTE] > This endpoint is in public preview and is subject to change.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      selected_usernames: {
        type: "array",
        description: "The usernames of the organization members to be granted access to GitHub Copilot.",
        items: {
          type: "string",
        },
      },
    },
    required: ["org", "selected_usernames"],
  },
  request: {
    method: "POST",
    path: "/orgs/{org}/copilot/billing/selected_users",
    body: ["selected_usernames"],
  },
});
