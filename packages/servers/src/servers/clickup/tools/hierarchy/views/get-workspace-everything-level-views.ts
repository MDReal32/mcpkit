import { defineTool } from "@usemcpkit/core";

export const hierarchyViewsGetWorkspaceEverythingLevelViews = defineTool({
  name: "hierarchy:views:get_workspace_everything_level_views",
  description:
    "Get Workspace (Everything level) Views. View the task and page views available at the Everything Level of a Workspace.",
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
    path: "/v2/team/{team_id}/view",
  },
});
