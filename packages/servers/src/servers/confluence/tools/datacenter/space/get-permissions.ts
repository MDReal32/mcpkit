import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceGetPermissions = defineTool({
  name: "datacenter:space:get_permissions",
  description:
    "[Data Center] Get all space permissions. Returns list of permissions granted to users and groups in the particular space.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
      },
    },
    required: ["spaceKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/space/{spaceKey}/permissions",
  },
});
