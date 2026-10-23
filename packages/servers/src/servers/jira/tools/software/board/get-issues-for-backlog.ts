import { defineTool } from '@usemcpkit/core';

export const softwareBoardGetIssuesForBacklog = defineTool({
  name: 'software:board:get_issues_for_backlog',
  description:
    "[Deprecated] Get issues for backlog. Returns all issues from the board's backlog, for the given board ID. This only includes issues that the user has permission to view. The backlog contains incomplete issues that are not assigned to any future or active sprint. Note, if the user does not have permission to view the board, no issues will be returned at all. Issues returned from this resource include Agile fields, like sprint, closed…",
  input: {
    type: 'object',
    properties: {
      boardId: {
        type: 'integer',
        description: 'The ID of the board that has the backlog containing the requested issues.',
      },
      startAt: {
        type: 'integer',
        description:
          "The starting index of the returned issues. Base index: 0. See the 'Pagination' section at the top of this page for more details.",
      },
      maxResults: {
        type: 'integer',
        description:
          "The maximum number of issues to return per page. Default: 50. See the 'Pagination' section at the top of this page for more details. Note, the total number of issues returned is limited by the property 'jira.search.views.default.max' in your Jira instance. If you exceed this limit, your results will be truncated.",
      },
      jql: {
        type: 'string',
        description:
          "Filters results using a JQL query. If you define an order in your JQL query, it will override the default order of the returned issues. Note that `username` and `userkey` can't be used as search terms for this parameter due to privacy reasons. Use `accountId` instead.",
      },
      validateQuery: {
        type: 'boolean',
        description: 'Specifies whether to validate the JQL query or not. Default: true.',
      },
      fields: {
        type: 'string',
        description:
          'The list of fields to return for each issue. By default, all navigable and Agile fields are returned. (comma-separated)',
      },
      expand: {
        type: 'string',
        description: 'This parameter is currently not used.',
      },
    },
    required: ['boardId'],
  },
  request: {
    method: 'GET',
    path: '/rest/agile/1.0/board/{boardId}/backlog',
    query: ['startAt', 'maxResults', 'jql', 'validateQuery', 'fields', 'expand'],
  },
});
