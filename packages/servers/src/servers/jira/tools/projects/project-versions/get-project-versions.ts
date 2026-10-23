import { defineTool } from '@usemcpkit/core';

export const projectsProjectVersionsGetProjectVersions = defineTool({
  name: 'projects:project_versions:get_project_versions',
  description:
    'Get project versions. Returns all versions in a project. The response is not paginated. Use Get project versions paginated if you want to get the versions in a project with pagination.',
  input: {
    type: 'object',
    properties: {
      projectIdOrKey: {
        type: 'string',
        description: 'The project ID or project key (case sensitive).',
      },
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information in the response. This parameter accepts `operations`, which returns actions that can be performed on the version.',
      },
    },
    required: ['projectIdOrKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/project/{projectIdOrKey}/versions',
    query: ['expand'],
  },
});
