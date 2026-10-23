import { defineTool } from '@usemcpkit/core';

export const datacenterContentDeleteVersion = defineTool({
  name: 'datacenter:content:delete_version',
  description:
    '[Data Center] Delete content history. Delete a historical version of a page or a blogpost. Current user must have edit permission on content, or it will throw a permission exception.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      versionNumber: {
        type: 'integer',
        description: 'version number starts from 1 up to current version.',
      },
    },
    required: ['id', 'versionNumber'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/content/{id}/version/{versionNumber}',
  },
});
