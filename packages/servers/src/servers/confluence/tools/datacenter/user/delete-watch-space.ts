import { defineTool } from "@usemcpkit/core";

export const datacenterUserDeleteWatchSpace = defineTool({
  name: "datacenter:user:delete_watch_space",
  description:
    "[Data Center] Remove space watcher. Delete an existing watcher for the given user and space key. User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs to be a Confluence administrator.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
      },
      contentType: {
        type: "string",
        description: "the optional content type to delete the watcher for. (comma-separated)",
      },
      key: {
        type: "object",
        properties: {
          userKey: {
            type: "string",
          },
        },
        description: "userkey of the user to delete the watcher for.",
      },
      username: {
        type: "string",
        description: "username of the user to delete the watcher for.",
      },
    },
    required: ["spaceKey"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/user/watch/space/{spaceKey}",
    query: ["contentType", "key", "username"],
  },
});
