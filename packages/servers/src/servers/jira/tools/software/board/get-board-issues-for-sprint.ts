import { defineTool } from "@usemcpkit/core";

export const softwareBoardGetBoardIssuesForSprint = defineTool({
  name: "software:board:get_board_issues_for_sprint",
  description:
    "[Deprecated] Get board issues for sprint. Get all issues you have access to that belong to the sprint from the board. Issue returned from this resource contains additional fields like: sprint, closedSprints, flagged and epic. Issues are returned ordered by rank. JQL order has higher priority than default rank.",
  input: {
    type: "object",
    properties: {
      boardId: {
        type: "integer",
        description: "The ID of the board that contains requested issues.",
      },
      sprintId: {
        type: "integer",
        description: "The ID of the sprint that contains requested issues.",
      },
      startAt: {
        type: "integer",
        description:
          "The starting index of the returned issues. Base index: 0. See the 'Pagination' section at the top of this page for more details.",
      },
      maxResults: {
        type: "integer",
        description:
          "The maximum number of issues to return per page. See the 'Pagination' section at the top of this page for more details. Note, the total number of issues returned is limited by the property 'jira.search.views.default.max' in your Jira instance. If you exceed this limit, your results will be truncated.",
      },
      jql: {
        type: "string",
        description:
          "Filters results using a JQL query. If you define an order in your JQL query, it will override the default order of the returned issues. Note that `username` and `userkey` can't be used as search terms for this parameter due to privacy reasons. Use `accountId` instead.",
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
    required: ["boardId", "sprintId"],
  },
  request: {
    method: "GET",
    path: "/rest/agile/1.0/board/{boardId}/sprint/{sprintId}/issue",
    query: ["startAt", "maxResults", "jql", "validateQuery", "fields", "expand"],
  },
});
