import { defineTool } from '@usemcpkit/core';

export const issuesLabelsUpdateProjectsLabels = defineTool({
  name: 'issues:labels:update_projects_labels',
  description:
    '[Deprecated] Update an existing label. At least one optional parameter is required. Deprecated in GitLab 12.4. Use PUT /projects/:id/labels/:name instead.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
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
          'The new name of the label. At least one of `new_name`, `color`, `description`, `priority`, `archived` must be provided.',
      },
      color: {
        type: 'string',
        description:
          'New color of the label, given in 6-digit hex notation with a leading `#` sign (for example, `#FFAABB`), or one of the CSS color names. At least one of `new_name`, `color`, `description`, `priority`, `archived` must be provided.',
      },
      description: {
        type: 'string',
        description:
          'New description of label. At least one of `new_name`, `color`, `description`, `priority`, `archived` must be provided.',
      },
      archived: {
        type: 'boolean',
        description:
          'Whether the label is archived. At least one of `new_name`, `color`, `description`, `priority`, `archived` must be provided.',
      },
      priority: {
        type: 'integer',
        description:
          'The priority of the label. At least one of `new_name`, `color`, `description`, `priority`, `archived` must be provided.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/labels',
    body: ['label_id', 'name', 'new_name', 'color', 'description', 'archived', 'priority'],
  },
});
