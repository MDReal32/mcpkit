import { defineTool } from '@usemcpkit/core';

export const ciTerraformCreateProjectsTerraformStateAuthorize = defineTool({
  name: 'ci:terraform:create_projects_terraform_state_authorize',
  description:
    'Authorize Terraform state upload. Authorizes uploading a Terraform state for a specified project. This feature was introduced in GitLab 18.5.',
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
    method: 'POST',
    path: '/projects/{id}/terraform/state/{name}/authorize',
  },
});
