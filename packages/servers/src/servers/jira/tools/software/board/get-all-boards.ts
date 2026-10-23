import { defineTool } from '@usemcpkit/core';

export const softwareBoardGetAllBoards = defineTool({
  name: 'software:board:get_all_boards',
  description: 'Get all boards. Returns all boards. This only includes boards that the user has permission to view.',
  input: {
    type: 'object',
    properties: {
      startAt: {
        type: 'integer',
        default: 0,
        description:
          "The starting index of the returned boards. Base index: 0. See the 'Pagination' section at the top of this page for more details.",
      },
      maxResults: {
        type: 'integer',
        default: 50,
        description:
          "The maximum number of boards to return per page. See the 'Pagination' section at the top of this page for more details.",
      },
      type: {
        type: 'object',
        description: 'Filters results to boards of the specified types. Valid values: scrum, kanban, simple.',
      },
      name: {
        type: 'string',
        description: 'Filters results to boards that match or partially match the specified name.',
      },
      projectKeyOrId: {
        type: 'string',
        description:
          'Filters results to boards that are relevant to a project. Relevance means that the jql filter defined in board contains a reference to a project.',
      },
      accountIdLocation: {
        type: 'string',
      },
      projectLocation: {
        type: 'string',
      },
      includePrivate: {
        type: 'boolean',
        description:
          'Appends private boards to the end of the list. The name and type fields are excluded for security reasons.',
      },
      negateLocationFiltering: {
        type: 'boolean',
        description: 'If set to true, negate filters used for querying by location. By default false.',
      },
      orderBy: {
        type: 'string',
        enum: ['name', '-name', '+name'],
        description:
          'Ordering of the results by a given field. If not provided, values will not be sorted. Valid values: name.',
      },
      expand: {
        type: 'string',
        description: 'List of fields to expand for each board. Valid values: admins, permissions.',
      },
      projectTypeLocation: {
        type: 'string',
        description:
          'Filters results to boards that are relevant to a project types. Support Jira Software, Jira Service Management. Valid values: software, service\\_desk. By default software. (comma-separated)',
      },
      filterId: {
        type: 'integer',
        description: 'Filters results to boards that are relevant to a filter. Not supported for next-gen boards.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/agile/1.0/board',
    query: [
      'startAt',
      'maxResults',
      'type',
      'name',
      'projectKeyOrId',
      'accountIdLocation',
      'projectLocation',
      'includePrivate',
      'negateLocationFiltering',
      'orderBy',
      'expand',
      'projectTypeLocation',
      'filterId',
    ],
  },
});
