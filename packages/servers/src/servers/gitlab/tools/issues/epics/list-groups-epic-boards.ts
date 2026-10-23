import { defineTool } from '@usemcpkit/core';

export const issuesEpicsListGroupsEpicBoards = defineTool({
  name: 'issues:epics:list_groups_epic_boards',
  description:
    'List all epic boards in a group. Lists all epic boards for a specified group. This feature was introduced in GitLab 15.9.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/epic_boards',
    query: ['page', 'per_page'],
  },
});
