import { defineTool } from '@usemcpkit/core';

export const groupsGroupImportAndExportGetGroupsExportDownload = defineTool({
  name: 'groups:group_import_and_export:get_groups_export_download',
  description: 'Retrieve a group export download. Retrieves the exported archive for a specified group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/export/download',
  },
});
