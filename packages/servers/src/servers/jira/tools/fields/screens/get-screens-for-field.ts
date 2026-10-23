import { defineTool } from '@usemcpkit/core';

export const fieldsScreensGetScreensForField = defineTool({
  name: 'fields:screens:get_screens_for_field',
  description: 'Get screens for a field. Returns a paginated list of the screens a field is used in.',
  input: {
    type: 'object',
    properties: {
      fieldId: {
        type: 'string',
        description: 'The ID of the field to return screens for.',
      },
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'integer',
        default: 100,
        description: 'The maximum number of items to return per page.',
      },
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information about screens in the response. This parameter accepts `tab` which returns details about the screen tabs the field is used in.',
      },
    },
    required: ['fieldId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/field/{fieldId}/screens',
    query: ['startAt', 'maxResults', 'expand'],
  },
});
