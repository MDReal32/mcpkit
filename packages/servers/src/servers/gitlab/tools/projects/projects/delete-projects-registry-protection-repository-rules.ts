import { defineTool } from '@usemcpkit/core';

export const projectsProjectsDeleteProjectsRegistryProtectionRepositoryRules = defineTool({
  name: 'projects:projects:delete_projects_registry_protection_repository_rules',
  description:
    'Delete a container repository protection rule. Deletes a specified container repository protection rule.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      protection_rule_id: {
        type: 'integer',
        description: 'ID of the container repository protection rule.',
      },
    },
    required: ['id', 'protection_rule_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/registry/protection/repository/rules/{protection_rule_id}',
  },
});
