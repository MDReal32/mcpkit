import { defineTool } from '@usemcpkit/core';

export const cloudCustomContentGetCustomContentVersionDetails = defineTool({
  name: 'cloud:custom_content:get_custom_content_version_details',
  description:
    '[Cloud] Get version details for custom content version. Retrieves version details for the specified custom content and version number.',
  input: {
    type: 'object',
    properties: {
      custom_content_id: {
        type: 'integer',
        description: 'The ID of the custom content for which version details should be returned.',
      },
      version_number: {
        type: 'integer',
        description: 'The version number of the custom content to be returned.',
      },
    },
    required: ['custom_content_id', 'version_number'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/custom-content/{custom_content_id}/versions/{version_number}',
  },
});
