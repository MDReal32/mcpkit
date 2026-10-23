import { defineTool } from "@usemcpkit/core";

export const datacenterAdminCreateGroup = defineTool({
  name: "datacenter:admin:create_group",
  description: "[Data Center] Create group. Creates the given group identified by name.",
  input: {
    type: "object",
    properties: {
      body: {},
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/admin/group",
    bodyArg: "body",
  },
});
