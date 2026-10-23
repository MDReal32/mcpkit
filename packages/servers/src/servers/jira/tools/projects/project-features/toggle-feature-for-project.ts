import { defineTool } from '@usemcpkit/core';

export const projectsProjectFeaturesToggleFeatureForProject = defineTool({
  name: 'projects:project_features:toggle_feature_for_project',
  description: 'Set project feature state. Sets the state of a project feature.',
  input: {
    type: 'object',
    properties: {
      projectIdOrKey: {
        type: 'string',
        description: 'The ID or (case-sensitive) key of the project.',
      },
      featureKey: {
        type: 'string',
        description: 'The key of the feature.',
      },
      state: {
        type: 'string',
        description: 'The feature state.',
        enum: ['ENABLED', 'DISABLED', 'COMING_SOON'],
      },
    },
    required: ['projectIdOrKey', 'featureKey'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/project/{projectIdOrKey}/features/{featureKey}',
    body: ['state'],
  },
});
