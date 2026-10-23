import { defineTool } from '@usemcpkit/core';

export const cloudV1ContentCopyPageHierarchy = defineTool({
  name: 'cloud_v1:content:copy_page_hierarchy',
  description:
    '[Cloud v1] Copy page hierarchy. Copy page hierarchy allows the copying of an entire hierarchy of pages and their associated properties, permissions and attachments. The id path parameter refers to the content id of the page to copy, and the new parent of this copied page is defined using the destinationPageId in the request body. The titleOptions object defines the rules of renaming page titles during the copy; for example, sea…',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      copyAttachments: {
        type: 'boolean',
        description: 'If set to `true`, attachments are copied to the destination page.',
      },
      copyPermissions: {
        type: 'boolean',
        description: 'If set to `true`, page permissions are copied to the destination page.',
      },
      copyProperties: {
        type: 'boolean',
        description: 'If set to `true`, content properties are copied to the destination page.',
      },
      copyLabels: {
        type: 'boolean',
        description: 'If set to `true`, labels are copied to the destination page.',
      },
      copyCustomContents: {
        type: 'boolean',
        description: 'If set to `true`, custom contents are copied to the destination page.',
      },
      copyDescendants: {
        type: 'boolean',
        description: 'If set to `true`, descendants are copied to the destination page.',
      },
      destinationPageId: {
        type: 'string',
      },
      titleOptions: {
        type: 'object',
        description: 'Required for copying page in the same space.',
        properties: {
          prefix: {
            type: 'string',
          },
          replace: {
            type: 'string',
          },
          search: {
            type: 'string',
          },
        },
      },
    },
    required: ['id', 'destinationPageId'],
  },
  request: {
    method: 'POST',
    path: '/wiki/rest/api/content/{id}/pagehierarchy/copy',
    body: [
      'copyAttachments',
      'copyPermissions',
      'copyProperties',
      'copyLabels',
      'copyCustomContents',
      'copyDescendants',
      'destinationPageId',
      'titleOptions',
    ],
  },
});
