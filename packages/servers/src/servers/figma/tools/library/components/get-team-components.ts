import { defineTool } from "@usemcpkit/core";

export const libraryComponentsGetTeamComponents = defineTool({
  name: "library:components:get_team_components",
  description: "Get team components. Get a paginated list of published components within a team library.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "string",
        description: "Id of the team to list components from.",
      },
      page_size: {
        type: "number",
        default: 30,
        description: "Number of items to return in a paged list of results. Defaults to 30. Maximum of 1000.",
      },
      after: {
        type: "number",
        description:
          "Cursor indicating which id after which to start retrieving components for. Exclusive with before. The cursor value is an internally tracked integer that doesn't correspond to any Ids.",
      },
      before: {
        type: "number",
        description:
          "Cursor indicating which id before which to start retrieving components for. Exclusive with after. The cursor value is an internally tracked integer that doesn't correspond to any Ids.",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "GET",
    path: "/v1/teams/{team_id}/components",
    query: ["page_size", "after", "before"],
  },
});
