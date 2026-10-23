import { defineTool } from '@usemcpkit/core';

export const workflowsIssuePrioritiesMovePriorities = defineTool({
  name: 'workflows:issue_priorities:move_priorities',
  description: 'Move priorities. Changes the order of issue priorities.',
  input: {
    type: 'object',
    properties: {
      after: {
        type: 'string',
        description: "The ID of the priority. Required if `position` isn't provided.",
      },
      ids: {
        type: 'array',
        description: 'The list of issue IDs to be reordered. Cannot contain duplicates nor after ID.',
        items: {
          type: 'string',
        },
      },
      position: {
        type: 'string',
        description: "The position for issue priorities to be moved to. Required if `after` isn't provided.",
      },
    },
    required: ['ids'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/priority/move',
    body: ['after', 'ids', 'position'],
  },
});
