import { defineTool } from '@usemcpkit/core';

export const softwareSprintGetProperty = defineTool({
  name: 'software:sprint:get_property',
  description:
    'Get property. Returns the value of the property with a given key from the sprint identified by the provided id. The user who retrieves the property is required to have permissions to view the sprint.',
  input: {
    type: 'object',
    properties: {
      sprintId: {
        type: 'string',
        description: 'the ID of the sprint from which the property will be returned.',
      },
      propertyKey: {
        type: 'string',
        description: 'the key of the property to return.',
      },
    },
    required: ['sprintId', 'propertyKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/agile/1.0/sprint/{sprintId}/properties/{propertyKey}',
  },
});
