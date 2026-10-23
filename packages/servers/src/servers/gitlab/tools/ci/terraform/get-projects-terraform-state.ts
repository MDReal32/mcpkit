import { defineTool } from '@usemcpkit/core';

export const ciTerraformGetProjectsTerraformState = defineTool({
  name: 'ci:terraform:get_projects_terraform_state',
  description: 'Retrieve a Terraform state. Retrieves a Terraform state by name for a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      name: {
        type: 'string',
        description: 'Name of the Terraform state.',
      },
      ID: {
        type: 'string',
        description: 'Terraform state lock ID.',
      },
    },
    required: ['id', 'name'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/terraform/state/{name}',
    query: ['ID'],
  },
});
