import { defineTool } from '@usemcpkit/core';

export const appsUiModificationsAppsGetUiModifications = defineTool({
  name: 'apps:ui_modifications_apps:get_ui_modifications',
  description: 'Get UI modifications. Gets UI modifications. UI modifications can only be retrieved by Forge apps.',
  input: {
    type: 'object',
    properties: {
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'integer',
        default: 50,
        description: 'The maximum number of items to return per page.',
      },
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/uiModifications',
    query: ['startAt', 'maxResults', 'expand'],
  },
});
