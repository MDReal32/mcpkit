import { defineTool } from "@usemcpkit/core";

export const datacenterUserList = defineTool({
  name: "datacenter:user:list",
  description:
    "[Data Center] Get user. Get information about a user identified by either user key or username. Example request URI(s):",
  input: {
    type: "object",
    properties: {
      expand: {
        type: "string",
        description: "properties to expand on the user.",
      },
      key: {
        type: "string",
        description: "userkey of the user to request from this resource.",
      },
      username: {
        type: "string",
        description: "userName of the user to create the new watcher for.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/user",
    query: ["expand", "key", "username"],
  },
});
