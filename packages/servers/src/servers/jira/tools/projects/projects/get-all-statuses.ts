import { defineTool } from '@usemcpkit/core';

export const projectsProjectsGetAllStatuses = defineTool({
  name: 'projects:projects:get_all_statuses',
  description:
    'Get all statuses for project. Returns the valid statuses for a project. The statuses are grouped by issue type, as each project has a set of valid issue types and each issue type has a set of valid statuses.',
  input: {
    type: 'object',
    properties: {
      projectIdOrKey: {
        type: 'string',
        description: 'The project ID or project key (case sensitive).',
      },
    },
    required: ['projectIdOrKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/project/{projectIdOrKey}/statuses',
  },
});
