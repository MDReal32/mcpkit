import { defineTool } from "@usemcpkit/core";

export const cloudSpaceRoleModeGetSpaceRoleMode = defineTool({
  name: "cloud:space_role_mode:get_space_role_mode",
  description: "[Cloud] Get space role mode. Retrieves the space role mode.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/space-role-mode",
  },
});
