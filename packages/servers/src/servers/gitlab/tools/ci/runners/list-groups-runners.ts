import { defineTool } from '@usemcpkit/core';

export const ciRunnersListGroupsRunners = defineTool({
  name: 'ci:runners:list_groups_runners',
  description:
    'List all runners in a group. Lists all runners available in a specified group and any ancestor groups, including any allowed instance runners.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      type: {
        type: 'string',
        enum: ['instance_type', 'group_type', 'project_type'],
        description: 'Type of runners to return.',
      },
      paused: {
        type: 'boolean',
        description:
          'If `true`, returns only runners that are ignoring new jobs. If `false`, returns only runners that are accepting new jobs.',
      },
      status: {
        type: 'string',
        enum: ['active', 'paused', 'online', 'offline', 'never_contacted', 'stale'],
        description: 'Status of runners to return.',
      },
      tag_list: {
        type: 'string',
        description: 'List of runner tags. (comma-separated)',
      },
      version_prefix: {
        type: 'string',
        description: 'Version prefix of runners to return.',
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
    path: '/groups/{id}/runners',
    query: ['type', 'paused', 'status', 'tag_list', 'version_prefix', 'page', 'per_page'],
  },
});
