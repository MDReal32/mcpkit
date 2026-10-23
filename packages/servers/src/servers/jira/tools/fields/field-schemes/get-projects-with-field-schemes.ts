import { defineTool } from '@usemcpkit/core';

export const fieldsFieldSchemesGetProjectsWithFieldSchemes = defineTool({
  name: 'fields:field_schemes:get_projects_with_field_schemes',
  description:
    'Get projects with field schemes. Get projects with field association schemes. This will be a temporary API but useful when transitioning from the legacy field configuration APIs to the new ones.',
  input: {
    type: 'object',
    properties: {
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The starting index of the returned projects. Base index: 0.',
      },
      maxResults: {
        type: 'integer',
        default: 50,
        description: 'The maximum number of projects to return per page, maximum allowed value is 100.',
      },
      projectId: {
        type: 'string',
        description: 'List of project ids to filter the results by. (comma-separated)',
      },
    },
    required: ['projectId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/config/fieldschemes/projects',
    query: ['startAt', 'maxResults', 'projectId'],
  },
});
