import { defineTool } from '@usemcpkit/core';

export const metaMetadataGetVersion = defineTool({
  name: 'meta:metadata:get_version',
  description:
    'Retrieves version information for the GitLab instance. This feature was introduced in GitLab 8.13 and deprecated in 15.5. We recommend you instead use the Metadata API.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/version',
  },
});
