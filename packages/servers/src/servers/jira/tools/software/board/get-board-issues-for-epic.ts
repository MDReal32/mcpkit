import { defineTool } from "@usemcpkit/core";

export const softwareBoardGetBoardIssuesForEpic = defineTool({
  name: "software:board:get_board_issues_for_epic",
  description:
    "[Deprecated] Get board issues for epic. Returns all issues that belong to an epic on the board, for the given epic ID and the board ID. This only includes issues that the user has permission to view. Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic. By default, the returned issues are ordered by rank.",
  input: {
    type: "object",
    properties: {
      boardId: {
        type: "integer",
        description: "The ID of the board that contains the requested issues.",
      },
      epicId: {
        type: "integer",
        description: "The ID of the epic that contains the requested issues.",
      },
      startAt: {
        type: "integer",
        description:
          "The starting index of the returned issues. Base index: 0. See the 'Pagination' section at the top of this page for more details.",
      },
      maxResults: {
        type: "integer",
        description:
          "The maximum number of issues to return per page. Default: 50. See the 'Pagination' section at the top of this page for more details. Note, the total number of issues returned is limited by the property 'jira.search.views.default.max' in your Jira instance. If you exceed this limit, your results will be truncated.",
      },
      jql: {
        type: "string",
        description:
          "Filters results using a JQL query. If you define an order in your JQL query, it will override the default order of the returned issues.",
      },
      validateQuery: {
        type: "boolean",
        description: "Specifies whether to validate the JQL query or not. Default: true.",
      },
      fields: {
        type: "string",
        description:
          "The list of fields to return for each issue. By default, all navigable and Agile fields are returned. (comma-separated)",
      },
      expand: {
        type: "string",
        description: "A comma-separated list of the parameters to expand.",
      },
    },
    required: ["boardId", "epicId"],
  },
  request: {
    method: "GET",
    path: "/rest/agile/1.0/board/{boardId}/epic/{epicId}/issue",
    query: ["startAt", "maxResults", "jql", "validateQuery", "fields", "expand"],
  },
});
