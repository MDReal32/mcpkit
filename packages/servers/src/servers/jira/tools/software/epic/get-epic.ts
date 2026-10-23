import { defineTool } from '@usemcpkit/core';

export const softwareEpicGetEpic = defineTool({
  name: 'software:epic:get_epic',
  description:
    'Get epic. Returns the epic for a given epic ID. This epic will only be returned if the user has permission to view it. **Note:** This operation does not work for epics in next-gen projects.',
  input: {
    type: 'object',
    properties: {
      epicIdOrKey: {
        type: 'string',
        description: 'The id or key of the requested epic.',
      },
    },
    required: ['epicIdOrKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/agile/1.0/epic/{epicIdOrKey}',
  },
});
