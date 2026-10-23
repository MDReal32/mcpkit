import { defineTool } from '@usemcpkit/core';

export const fieldsScreenTabFieldsAddScreenTabField = defineTool({
  name: 'fields:screen_tab_fields:add_screen_tab_field',
  description: 'Add screen tab field. Adds a field to a screen tab.',
  input: {
    type: 'object',
    properties: {
      screenId: {
        type: 'integer',
        description: 'The ID of the screen.',
      },
      tabId: {
        type: 'integer',
        description: 'The ID of the screen tab.',
      },
      skipFieldAssociation: {
        type: 'boolean',
        description:
          'Whether to skip associating the added field with projects linked to this screen. By default, adding a field to a screen tab also updates the field configuration of associated projects, making the field visible in issue experiences. When set to true, the field is added to the screen tab only and will not be visible in experiences such as issue view for associated projects unless the field associat…',
        default: false,
      },
      fieldId: {
        type: 'string',
        description: 'The ID of the field to add.',
      },
    },
    required: ['screenId', 'tabId', 'fieldId'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/screens/{screenId}/tabs/{tabId}/fields',
    query: ['skipFieldAssociation'],
    body: ['fieldId'],
  },
});
