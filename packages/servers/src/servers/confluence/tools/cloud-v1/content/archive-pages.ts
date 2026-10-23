import { defineTool } from '@usemcpkit/core';

export const cloudV1ContentArchivePages = defineTool({
  name: 'cloud_v1:content:archive_pages',
  description:
    '[Cloud v1] Archive pages. Archives a list of pages. The pages to be archived are specified as a list of content IDs. This API accepts the archival request and returns a task ID. The archival process happens asynchronously. Use the /longtask/<taskId> REST API to get the copy task status.',
  input: {
    type: 'object',
    properties: {
      pages: {
        type: 'array',
        items: {
          type: 'object',
        },
      },
    },
  },
  request: {
    method: 'POST',
    path: '/wiki/rest/api/content/archive',
    body: ['pages'],
  },
});
