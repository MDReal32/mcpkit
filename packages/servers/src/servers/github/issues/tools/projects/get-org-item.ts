import { defineTool } from '@usemcpkit/core';

export const projectsGetOrgItem = defineTool({
  name: 'projects:get_org_item',
  description: 'Get an item for an organization owned project. Get a specific item from an organization-owned project.',
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
      fields: {
        description:
          'Limit results to specific fields, by their IDs. If not specified, the title field will be returned.',
      },
    },
    required: ['project_number', 'org', 'item_id'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/projectsV2/{project_number}/items/{item_id}',
    query: ['fields'],
  },
});
