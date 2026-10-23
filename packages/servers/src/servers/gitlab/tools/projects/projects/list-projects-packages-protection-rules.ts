import { defineTool } from '@usemcpkit/core';

export const projectsProjectsListProjectsPackagesProtectionRules = defineTool({
  name: 'projects:projects:list_projects_packages_protection_rules',
  description: 'List all package protection rules. Lists all package protection rules for a specified project.',
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
    path: '/projects/{id}/packages/protection/rules',
  },
});
