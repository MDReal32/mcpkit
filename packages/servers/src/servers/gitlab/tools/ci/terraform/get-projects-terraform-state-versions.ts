import { defineTool } from '@usemcpkit/core';

export const ciTerraformGetProjectsTerraformStateVersions = defineTool({
  name: 'ci:terraform:get_projects_terraform_state_versions',
  description: 'Retrieve a Terraform state version. Retrieves a specified Terraform state version.',
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
      serial: {
        type: 'integer',
        description: 'Version number of the Terraform state.',
      },
    },
    required: ['id', 'name', 'serial'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/terraform/state/{name}/versions/{serial}',
  },
});
