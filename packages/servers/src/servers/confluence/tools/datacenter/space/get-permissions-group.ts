import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceGetPermissionsGroup = defineTool({
  name: "datacenter:space:get_permissions_group",
  description:
    "[Data Center] Gets the permissions granted to a group in a space. Returns list of permissions granted to a group in the particular space.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
      },
      groupName: {
        type: "string",
      },
    },
    required: ["spaceKey", "groupName"],
  },
  request: {
    method: "GET",
    path: "/rest/api/space/{spaceKey}/permissions/group/{groupName}",
  },
});
