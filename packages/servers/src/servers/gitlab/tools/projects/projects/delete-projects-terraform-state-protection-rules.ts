import { defineTool } from '@usemcpkit/core';

export const projectsProjectsDeleteProjectsTerraformStateProtectionRules = defineTool({
  name: 'projects:projects:delete_projects_terraform_state_protection_rules',
  description: 'Delete a Terraform state protection rule. This feature was introduced in GitLab 19.0.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      terraform_state_protection_rule_id: {
        type: 'integer',
        description: 'ID of the Terraform state protection rule.',
      },
    },
    required: ['id', 'terraform_state_protection_rule_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/terraform/state_protection_rules/{terraform_state_protection_rule_id}',
  },
});
