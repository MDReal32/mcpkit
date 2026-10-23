import { defineTool } from '@usemcpkit/core';

export const issuesLabelsUpdateGroupsLabels = defineTool({
  name: 'issues:labels:update_groups_labels',
  description:
    'Update a group label. Updates an existing group label. At least one parameter is required to update the group label.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      label_id: {
        type: 'integer',
        description: 'ID of the label to update. Exactly one of `label_id`, `name` must be provided.',
      },
      name: {
        type: 'string',
        description: 'Name of the label to update. Exactly one of `label_id`, `name` must be provided.',
      },
      new_name: {
        type: 'string',
        description:
          'The new name of the label. At least one of `new_name`, `color`, `description`, `archived` must be provided.',
      },
      color: {
        type: 'string',
        description:
          'New color of the label, given in 6-digit hex notation with a leading `#` sign (for example, `#FFAABB`), or one of the CSS color names. At least one of `new_name`, `color`, `description`, `archived` must be provided.',
      },
      description: {
        type: 'string',
        description:
          'New description of label. At least one of `new_name`, `color`, `description`, `archived` must be provided.',
      },
      archived: {
        type: 'boolean',
        description:
          'Whether the label is archived. At least one of `new_name`, `color`, `description`, `archived` must be provided.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'PUT',
    path: '/groups/{id}/labels',
    body: ['label_id', 'name', 'new_name', 'color', 'description', 'archived'],
  },
});
