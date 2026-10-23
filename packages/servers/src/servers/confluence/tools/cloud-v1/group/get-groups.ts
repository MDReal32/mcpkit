import { defineTool } from "@usemcpkit/core";

export const cloudV1GroupGetGroups = defineTool({
  name: "cloud_v1:group:get_groups",
  description:
    "[Cloud v1] Get groups. Returns all user groups. The returned groups are ordered alphabetically in ascending order by group name.",
  input: {
    type: "object",
    properties: {
      start: {
        type: "integer",
        description: "The starting index of the returned groups.",
      },
      limit: {
        type: "integer",
        description:
          "The maximum number of groups to return per page. Note, this may be restricted by fixed system limits.",
      },
      accessType: {
        type: "string",
        enum: ["user", "admin", "site-admin"],
        description: "The group permission level for which to filter results.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/group",
    query: ["start", "limit", "accessType"],
  },
});
