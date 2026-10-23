import { defineTool } from "@usemcpkit/core";

export const datacenterUserGetMemberof = defineTool({
  name: "datacenter:user:get_memberof",
  description:
    "[Data Center] Get groups. Get a paginated collection of groups that the given user is a member of. Example request URI(s):",
  input: {
    type: "object",
    properties: {
      expand: {
        type: "string",
        description: "properties to expand on the user.",
      },
      limit: {
        type: "integer",
        description: "the limit of the number of users to return, this may be restricted by fixed system limits.",
      },
      start: {
        type: "integer",
        description: "the start point of the collection to return. This must be non-negative. Default value is 0.",
      },
      key: {
        type: "string",
        description: "userkey of the user to request from this resource",
      },
      username: {
        type: "string",
        description: "userName of the user to get the groups for.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/user/memberof",
    query: ["expand", "limit", "start", "key", "username"],
  },
});
