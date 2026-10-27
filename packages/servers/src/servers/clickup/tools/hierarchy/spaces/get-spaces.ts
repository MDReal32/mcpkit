import { defineTool } from "@usemcpkit/core";

export const hierarchySpacesGetSpaces = defineTool({
  name: "hierarchy:spaces:get_spaces",
  description: "Get Spaces. View the Spaces avialable in a Workspace. You can only get member info in private Spaces.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
      archived: {
        type: "boolean",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "GET",
    path: "/v2/team/{team_id}/space",
    query: ["archived"],
  },
});
