import { defineTool } from '@usemcpkit/core';

export const projectsProjectsListProjectsRegistryProtectionTagRules = defineTool({
  name: 'projects:projects:list_projects_registry_protection_tag_rules',
  description:
    'List all container registry protection tag rules. Lists all container registry protection tag rules for a project. This feature was introduced in GitLab 18.7.',
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
    path: '/projects/{id}/registry/protection/tag/rules',
  },
});
