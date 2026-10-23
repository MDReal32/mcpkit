import { defineTool } from "@usemcpkit/core";

export const datacenterUserGetWatchSpace = defineTool({
  name: "datacenter:user:get_watch_space",
  description:
    "[Data Center] Get information about space watcher. Get information about whether a user is watching a specified space. User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs to be a Confluence administrator.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
      },
      contentType: {
        type: "string",
        description: "an optional content type to check for watching state.",
      },
      key: {
        type: "object",
        properties: {
          userKey: {
            type: "string",
          },
        },
        description: "userkey of the user to check for watching state.",
      },
      username: {
        type: "string",
        description: "username of the user to check for watching state.",
      },
    },
    required: ["spaceKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/user/watch/space/{spaceKey}",
    query: ["contentType", "key", "username"],
  },
});
