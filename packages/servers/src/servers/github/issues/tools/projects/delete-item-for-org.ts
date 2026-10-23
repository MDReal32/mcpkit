import { defineTool } from '@usemcpkit/core';

export const projectsDeleteItemForOrg = defineTool({
  name: 'projects:delete_item_for_org',
  description: 'Delete project item for organization. Delete a specific item from an organization-owned project.',
  input: {
    type: 'object',
    properties: {
      project_number: {
        type: 'integer',
        description: "The project's number.",
      },
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      item_id: {
        type: 'integer',
        description: 'The unique identifier of the project item.',
      },
    },
    required: ['project_number', 'org', 'item_id'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/projectsV2/{project_number}/items/{item_id}',
  },
});
