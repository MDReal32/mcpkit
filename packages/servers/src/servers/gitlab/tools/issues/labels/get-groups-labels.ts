import { defineTool } from '@usemcpkit/core';

export const issuesLabelsGetGroupsLabels = defineTool({
  name: 'issues:labels:get_groups_labels',
  description: 'Retrieve a group label. Retrieves a specified group label.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      name: {
        type: 'string',
        description: 'ID or name of the label.',
      },
      include_ancestor_groups: {
        type: 'boolean',
        default: true,
        description: 'If `true`, includes ancestor groups.',
      },
      include_descendant_groups: {
        type: 'boolean',
        default: false,
        description: 'If `true`, includes descendant groups.',
      },
      only_group_labels: {
        type: 'boolean',
        default: true,
        description: 'If `true`, returns only group labels. If `false`, also returns project labels.',
      },
    },
    required: ['id', 'name'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/labels/{name}',
    query: ['include_ancestor_groups', 'include_descendant_groups', 'only_group_labels'],
  },
});
