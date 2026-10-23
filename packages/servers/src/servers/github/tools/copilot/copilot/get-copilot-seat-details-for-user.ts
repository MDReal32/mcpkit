import { defineTool } from "@usemcpkit/core";

export const copilotCopilotGetCopilotSeatDetailsForUser = defineTool({
  name: "copilot:copilot:get_copilot_seat_details_for_user",
  description:
    "Get Copilot seat assignment details for a user. > [!NOTE] > This endpoint is in public preview and is subject to change.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      username: {
        type: "string",
        description: "The handle for the GitHub user account.",
      },
    },
    required: ["org", "username"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/members/{username}/copilot",
  },
});
