import { defineTool } from '@usemcpkit/core';

export const cloudV1ContentDownloadAttatchment = defineTool({
  name: 'cloud_v1:content:download_attatchment',
  description:
    "[Cloud v1] Get URI to download attachment. Redirects the client to a URL that serves an attachment's binary data.",
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the content that the attachment is attached to.',
      },
      attachmentId: {
        type: 'string',
        description: 'The ID of the attachment to download.',
      },
      version: {
        type: 'integer',
        description:
          'The version of the attachment. If this parameter is absent, the redirect URI will download the latest version of the attachment.',
      },
      status: {
        type: 'string',
        description:
          'The statuses allowed on the retrieved attachment. If this parameter is absent, it will default to `current`. (comma-separated)',
      },
    },
    required: ['id', 'attachmentId'],
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/content/{id}/child/attachment/{attachmentId}/download',
    query: ['version', 'status'],
  },
});
