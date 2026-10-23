import { defineTool } from '@usemcpkit/core';

export const projectsProjectsCreateProjectsTerraformStateProtectionRules = defineTool({
  name: 'projects:projects:create_projects_terraform_state_protection_rules',
  description: 'Create a Terraform state protection rule for a project. This feature was introduced in GitLab 19.1.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      state_name: {
        type: 'string',
        description: 'Terraform state name to protect. Maximum 255 characters. Must be unique per project.',
      },
      minimum_access_level_for_write: {
        type: 'string',
        description:
          'Minimum GitLab access level required to write to the Terraform state. Valid values: developer, maintainer, owner, admin.',
        enum: ['developer', 'maintainer', 'owner', 'admin'],
      },
      allowed_from: {
        type: 'string',
        description:
          'Source restriction for write requests. Valid values: anywhere, ci_only, ci_on_protected_branch_only.',
        default: 'anywhere',
        enum: ['anywhere', 'ci_only', 'ci_on_protected_branch_only'],
      },
    },
    required: ['id', 'state_name', 'minimum_access_level_for_write'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/terraform/state_protection_rules',
    body: ['state_name', 'minimum_access_level_for_write', 'allowed_from'],
  },
});
