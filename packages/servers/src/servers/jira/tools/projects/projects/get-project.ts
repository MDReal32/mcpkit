import { defineTool } from '@usemcpkit/core';

export const projectsProjectsGetProject = defineTool({
  name: 'projects:projects:get_project',
  description: 'Get project. Returns the project details for a project.',
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
          'Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that the project description, issue types, and project lead are included in all responses by default. Expand options include:',
      },
      properties: {
        type: 'string',
        description:
          'A list of project properties to return for the project. This parameter accepts a comma-separated list. Note that only the properties named here are returned in `properties` in the response; that object is empty when this parameter is omitted. (comma-separated)',
      },
    },
    required: ['projectIdOrKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/project/{projectIdOrKey}',
    query: ['expand', 'properties'],
  },
});
