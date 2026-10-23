import { defineTool } from '@usemcpkit/core';

export const ciFeatureFlagsUpdateProjectsFeatureFlagsUserLists = defineTool({
  name: 'ci:feature_flags:update_projects_feature_flags_user_lists',
  description: 'Update a feature flag user list. Updates a specified feature flag user list.',
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
      name: {
        type: 'string',
        description: 'Name of the list.',
      },
      user_xids: {
        type: 'string',
        description: 'Comma-separated list of external user IDs.',
      },
    },
    required: ['id', 'iid'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/feature_flags_user_lists/{iid}',
    body: ['name', 'user_xids'],
  },
});
