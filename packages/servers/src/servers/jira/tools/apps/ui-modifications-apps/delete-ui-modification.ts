import { defineTool } from '@usemcpkit/core';

export const appsUiModificationsAppsDeleteUiModification = defineTool({
  name: 'apps:ui_modifications_apps:delete_ui_modification',
  description:
    'Delete UI modification. Deletes a UI modification. All the contexts that belong to the UI modification are deleted too. UI modification can only be deleted by Forge apps.',
  input: {
    type: 'object',
    properties: {
      uiModificationId: {
        type: 'string',
        description: 'The ID of the UI modification.',
      },
    },
    required: ['uiModificationId'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/uiModifications/{uiModificationId}',
  },
});
