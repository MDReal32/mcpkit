import { defineTool } from "@usemcpkit/core";

export const libraryComponentSetsGetTeamComponentSets = defineTool({
  name: "library:component_sets:get_team_component_sets",
  description: "Get team component sets. Get a paginated list of published component sets within a team library.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "string",
        description: "Id of the team to list component sets from.",
      },
      page_size: {
        type: "number",
        default: 30,
        description: "Number of items to return in a paged list of results. Defaults to 30.",
      },
      after: {
        type: "number",
        description:
          "Cursor indicating which id after which to start retrieving component sets for. Exclusive with before. The cursor value is an internally tracked integer that doesn't correspond to any Ids.",
      },
      before: {
        type: "number",
        description:
          "Cursor indicating which id before which to start retrieving component sets for. Exclusive with after. The cursor value is an internally tracked integer that doesn't correspond to any Ids.",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "GET",
    path: "/v1/teams/{team_id}/component_sets",
    query: ["page_size", "after", "before"],
  },
});
