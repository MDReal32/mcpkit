import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceUpdateRestore = defineTool({
  name: 'datacenter:space:update_restore',
  description:
    '[Data Center] Restore space. Restore the given Space identified by spaceKey. This method is idempotent i.e., if the Space is already restored then no action will be taken.',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'the key of the space to update.',
      },
    },
    required: ['spaceKey'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/space/{spaceKey}/restore',
  },
});
