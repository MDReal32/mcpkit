import { defineTool } from "@usemcpkit/core";

export const hierarchyWorkspacesGetAuthorizedWorkspaces = defineTool({
  name: "hierarchy:workspaces:get_authorized_workspaces",
  description: "Get Authorized Workspaces. View the Workspaces available to the authenticated user.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/v2/team",
  },
});
