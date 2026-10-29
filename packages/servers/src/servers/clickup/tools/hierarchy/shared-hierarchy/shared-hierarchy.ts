import { defineTool } from "@usemcpkit/core";

export const hierarchySharedHierarchySharedHierarchy = defineTool({
  name: "hierarchy:shared_hierarchy:shared_hierarchy",
  description:
    "Shared Hierarchy. View the tasks, Lists, and Folders that have been shared with the authenticated user.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "GET",
    path: "/v2/team/{team_id}/shared",
  },
});
