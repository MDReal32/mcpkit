import { defineTool } from '@usemcpkit/core';

export const projectsUpdateItemForUser = defineTool({
  name: 'projects:update_item_for_user',
  description: 'Update project item for user. Update a specific item in a user-owned project.',
  input: {
    type: 'object',
    properties: {
      project_number: {
        type: 'integer',
        description: "The project's number.",
      },
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      item_id: {
        type: 'integer',
        description: 'The unique identifier of the project item.',
      },
      fields: {
        type: 'array',
        description: 'A list of field updates to apply.',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'The ID of the project field to update.',
            },
            value: {
              description:
                'The new value for the field: - For text, number, and date fields, provide the new value directly. - For single select and iteration fields, provide the ID of the option or iteration. - To clear the field, set this to null.',
            },
          },
          required: ['id', 'value'],
        },
      },
    },
    required: ['project_number', 'username', 'item_id', 'fields'],
  },
  request: {
    method: 'PATCH',
    path: '/users/{username}/projectsV2/{project_number}/items/{item_id}',
    body: ['fields'],
  },
});
