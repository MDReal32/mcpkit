import { defineTool } from '@usemcpkit/core';

export const ciFeatureFlagsGetProjectsFeatureFlagsUserLists = defineTool({
  name: 'ci:feature_flags:get_projects_feature_flags_user_lists',
  description: 'Retrieve a feature flag user list. Retrieves a specified feature flag user list.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      iid: {
        type: 'string',
        description: "Internal ID of the project's feature flag user list.",
      },
    },
    required: ['id', 'iid'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/feature_flags_user_lists/{iid}',
  },
});
