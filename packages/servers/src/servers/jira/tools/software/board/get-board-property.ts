import { defineTool } from '@usemcpkit/core';

export const softwareBoardGetBoardProperty = defineTool({
  name: 'software:board:get_board_property',
  description:
    'Get board property. Returns the value of the property with a given key from the board identified by the provided id. The user who retrieves the property is required to have permissions to view the board.',
  input: {
    type: 'object',
    properties: {
      boardId: {
        type: 'string',
        description: 'the ID of the board from which the property will be returned.',
      },
      propertyKey: {
        type: 'string',
        description: 'the key of the property to return.',
      },
    },
    required: ['boardId', 'propertyKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/agile/1.0/board/{boardId}/properties/{propertyKey}',
  },
});
