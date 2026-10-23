import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceGetPermissionsAnonymous = defineTool({
  name: "datacenter:space:get_permissions_anonymous",
  description:
    "[Data Center] Gets the permissions granted to an anonymous user in a space. Returns list of permissions granted to anonymous user in the particular space.",
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
    path: "/rest/api/space/{spaceKey}/permissions/anonymous",
  },
});
