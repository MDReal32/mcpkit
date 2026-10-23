import { defineTool } from '@usemcpkit/core';

export const cloudV1ContentRemoveContentState = defineTool({
  name: 'cloud_v1:content:remove_content_state',
  description:
    '[Cloud v1] Removes the content state of a content and publishes a new version. Removes the content state of the content specified and creates a new version (publishes the content without changing the body) of the content with the new status.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The Id of the content whose content state is to be set.',
      },
      status: {
        type: 'string',
        enum: ['current', 'draft'],
        description: 'status of content state from which to delete state. Can be draft or archived',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/rest/api/content/{id}/state',
    query: ['status'],
  },
});
