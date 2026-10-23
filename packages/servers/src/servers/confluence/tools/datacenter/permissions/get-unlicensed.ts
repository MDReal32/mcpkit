import { defineTool } from "@usemcpkit/core";

export const datacenterPermissionsGetUnlicensed = defineTool({
  name: "datacenter:permissions:get_unlicensed",
  description:
    "[Data Center] Gets the permissions granted to an unlicensed users. Returns list of permissions granted to unlicensed users.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/permissions/unlicensed",
  },
});
