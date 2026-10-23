import { defineTool } from '@usemcpkit/core';

export const metaMetadataGetMetadata = defineTool({
  name: 'meta:metadata:get_metadata',
  description:
    'Retrieve metadata information for this GitLab instance. Retrieves metadata information for the GitLab instance.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/metadata',
  },
});
