import { defineTool } from '@usemcpkit/core';

export const ciFeatureFlagsCreateProjectsFeatureFlags = defineTool({
  name: 'ci:feature_flags:create_projects_feature_flags',
  description: 'Create a feature flag. Creates a feature flag for a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      name: {
        type: 'string',
        description: 'Name of the feature flag.',
      },
      description: {
        type: 'string',
        description: 'Description of the feature flag.',
      },
      active: {
        type: 'boolean',
        description: 'If `true`, the feature flag is active.',
        default: true,
      },
      strategies: {
        type: 'array',
        description: 'Array of feature flag strategies.',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description:
                'Name of the strategy. Can be `default`, `gradualRolloutUserId`, `userWithId`, `gitlabUserList`, or `flexibleRollout`.',
            },
            parameters: {
              type: 'object',
              description: 'Strategy parameters as a JSON-formatted string, for example `{"userIds":"user1"}`.',
            },
            user_list_id: {
              type: 'integer',
              description: 'ID of the feature flag user list. Applies only if the strategy is `gitlabUserList`.',
            },
            scopes: {
              type: 'array',
              description: 'Array of scopes for the strategy.',
              items: {
                type: 'object',
              },
            },
          },
          required: ['name'],
        },
      },
    },
    required: ['id', 'name'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/feature_flags',
    body: ['name', 'description', 'active', 'strategies'],
  },
});
