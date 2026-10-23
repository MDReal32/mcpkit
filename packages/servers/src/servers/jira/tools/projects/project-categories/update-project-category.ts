import { defineTool } from '@usemcpkit/core';

export const projectsProjectCategoriesUpdateProjectCategory = defineTool({
  name: 'projects:project_categories:update_project_category',
  description: 'Update project category. Updates a project category.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
      },
      description: {
        type: 'string',
        description: 'The description of the project category.',
      },
      body_id: {
        type: 'string',
        description: 'The ID of the project category.',
      },
      name: {
        type: 'string',
        description: 'The name of the project category. Required on create, optional on update.',
      },
      self: {
        type: 'string',
        description: 'The URL of the project category.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/projectCategory/{id}',
    body: {
      description: 'description',
      id: 'body_id',
      name: 'name',
      self: 'self',
    },
  },
});
