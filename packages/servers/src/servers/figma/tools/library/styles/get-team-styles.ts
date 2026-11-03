import { defineTool } from "@usemcpkit/core";

export const libraryStylesGetTeamStyles = defineTool({
  name: "library:styles:get_team_styles",
  description: "Get team styles. Get a paginated list of published styles within a team library.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "string",
        description: "Id of the team to list styles from.",
      },
      page_size: {
        type: "number",
        default: 30,
        description: "Number of items to return in a paged list of results. Defaults to 30.",
      },
      after: {
        type: "number",
        description:
          "Cursor indicating which id after which to start retrieving styles for. Exclusive with before. The cursor value is an internally tracked integer that doesn't correspond to any Ids.",
      },
      before: {
        type: "number",
        description:
          "Cursor indicating which id before which to start retrieving styles for. Exclusive with after. The cursor value is an internally tracked integer that doesn't correspond to any Ids.",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "GET",
    path: "/v1/teams/{team_id}/styles",
    query: ["page_size", "after", "before"],
  },
});
