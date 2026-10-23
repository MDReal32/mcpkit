import { defineTool } from "@usemcpkit/core";

export const datacenterUserUpdateSettings = defineTool({
  name: "datacenter:user:update_settings",
  description:
    "[Data Center] Update a user's preference settings. Update the specified user's settings including their prefered language setting.",
  input: {
    type: "object",
    properties: {
      username: {
        type: "string",
      },
      locale: {
        type: "string",
      },
    },
  },
  request: {
    method: "PUT",
    path: "/rest/api/user/settings",
    body: ["username", "locale"],
  },
});
