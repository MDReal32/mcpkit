import { defineTool } from '@usemcpkit/core';

export const projectsProjectsDeleteProjectsPackagesProtectionRules = defineTool({
  name: 'projects:projects:delete_projects_packages_protection_rules',
  description: 'Delete a package protection rule. Deletes a package protection rule from a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      package_protection_rule_id: {
        type: 'integer',
        description: 'ID of the package protection rule.',
      },
    },
    required: ['id', 'package_protection_rule_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/packages/protection/rules/{package_protection_rule_id}',
  },
});
