import { defineTool } from '@usemcpkit/core';

export const projectsProjectFeaturesGetFeaturesForProject = defineTool({
  name: 'projects:project_features:get_features_for_project',
  description: 'Get project features. Returns the list of features for a project.',
  input: {
    type: 'object',
    properties: {
      projectIdOrKey: {
        type: 'string',
        description: 'The ID or (case-sensitive) key of the project.',
      },
    },
    required: ['projectIdOrKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/project/{projectIdOrKey}/features',
  },
});
