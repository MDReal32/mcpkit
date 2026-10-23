import { defineTool } from "@usemcpkit/core";

export const datacenterUserGetCurrent = defineTool({
  name: "datacenter:user:get_current",
  description:
    "[Data Center] Get current user. Get information about the current logged in user. Example request URI(s):",
  input: {
    type: "object",
    properties: {
      expand: {
        type: "string",
        description: "properties to expand on the user.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/user/current",
    query: ["expand"],
  },
});
