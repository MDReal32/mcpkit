import { defineTool } from '@usemcpkit/core';

export const softwareEpicPartiallyUpdateEpic = defineTool({
  name: 'software:epic:partially_update_epic',
  description:
    'Partially update epic. Performs a partial update of the epic. A partial update means that fields not present in the request JSON will not be updated. Valid values for color are `color_1` to `color_9`. **Note:** This operation does not work for epics in next-gen projects.',
  input: {
    type: 'object',
    properties: {
      epicIdOrKey: {
        type: 'string',
        description: 'The id or key of the epic to update.',
      },
      color: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            enum: [
              'color_1',
              'color_2',
              'color_3',
              'color_4',
              'color_5',
              'color_6',
              'color_7',
              'color_8',
              'color_9',
              'color_10',
              'color_11',
              'color_12',
              'color_13',
              'color_14',
            ],
          },
        },
      },
      done: {
        type: 'boolean',
      },
      name: {
        type: 'string',
      },
      summary: {
        type: 'string',
      },
    },
    required: ['epicIdOrKey'],
  },
  request: {
    method: 'POST',
    path: '/rest/agile/1.0/epic/{epicIdOrKey}',
    body: ['color', 'done', 'name', 'summary'],
  },
});
