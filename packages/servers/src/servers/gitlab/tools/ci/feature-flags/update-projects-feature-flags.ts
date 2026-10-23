import { defineTool } from '@usemcpkit/core';

export const ciFeatureFlagsUpdateProjectsFeatureFlags = defineTool({
  name: 'ci:feature_flags:update_projects_feature_flags',
  description: 'Update a feature flag. Updates a specified feature flag.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      feature_flag_name: {
        type: 'string',
        description: 'Name of the feature flag.',
      },
      name: {
        type: 'string',
        description: 'New name of the feature flag.',
      },
      description: {
        type: 'string',
        description: 'Description of the feature flag.',
      },
      active: {
        type: 'boolean',
        description: 'If `true`, the feature flag is active.',
      },
      strategies: {
        type: 'array',
        description: 'Array of feature flag strategies.',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID of the feature flag strategy.',
            },
            name: {
              type: 'string',
              description: 'Name of the strategy.',
            },
            parameters: {
              type: 'object',
              description: 'Strategy parameters as a JSON-formatted string, for example `{"userIds":"user1"}`.',
            },
            user_list_id: {
              type: 'integer',
              description: 'ID of the feature flag user list. Applies only if the strategy is `gitlabUserList`.',
            },
            _destroy: {
              type: 'boolean',
              description: 'If `true`, deletes the strategy.',
            },
            scopes: {
              type: 'array',
              description: 'Array of scopes for the strategy.',
              items: {
                type: 'object',
              },
            },
          },
        },
      },
    },
    required: ['id', 'feature_flag_name'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/feature_flags/{feature_flag_name}',
    body: ['name', 'description', 'active', 'strategies'],
  },
});
