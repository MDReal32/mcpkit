import { defineTool } from '@usemcpkit/core';

export const ciTerraformDeleteProjectsTerraformState = defineTool({
  name: 'ci:terraform:delete_projects_terraform_state',
  description: 'Delete a Terraform state. Deletes a Terraform state for a specified project.',
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
    },
    required: ['id', 'name'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/terraform/state/{name}',
  },
});
