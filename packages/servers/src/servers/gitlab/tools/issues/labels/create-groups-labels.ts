import { defineTool } from '@usemcpkit/core';

export const issuesLabelsCreateGroupsLabels = defineTool({
  name: 'issues:labels:create_groups_labels',
  description: 'Create a group label. Creates a group label.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      name: {
        type: 'string',
        description: 'The name of the label to be created',
      },
      color: {
        type: 'string',
        description:
          'Color of the label in 6-digit hex notation with a leading `#` sign, for example `#FFAABB`, or one of the CSS color names.',
      },
      description: {
        type: 'string',
        description: 'Description of the label.',
      },
      archived: {
        type: 'boolean',
        description: 'Whether the label is archived',
      },
    },
    required: ['id', 'name', 'color'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/labels',
    body: ['name', 'color', 'description', 'archived'],
  },
});
