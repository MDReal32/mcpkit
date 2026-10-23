import { defineTool } from '@usemcpkit/core';

export const softwareSprintDeleteProperty = defineTool({
  name: 'software:sprint:delete_property',
  description:
    'Delete property. Removes the property from the sprint identified by the id. Ths user removing the property is required to have permissions to modify the sprint.',
  input: {
    type: 'object',
    properties: {
      sprintId: {
        type: 'string',
        description: 'the ID of the sprint from which the property will be removed.',
      },
      propertyKey: {
        type: 'string',
        description: 'the key of the property to remove.',
      },
    },
    required: ['sprintId', 'propertyKey'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/agile/1.0/sprint/{sprintId}/properties/{propertyKey}',
  },
});
