import { defineTool } from '@usemcpkit/core';

export const projectsProjectsListProjectsTerraformStateProtectionRules = defineTool({
  name: 'projects:projects:list_projects_terraform_state_protection_rules',
  description:
    'List all Terraform state protection rules for a project. Lists all Terraform state protection rules for a project. This feature was introduced in GitLab 18.11.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/terraform/state_protection_rules',
  },
});
