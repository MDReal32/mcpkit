import { defineTool } from '@usemcpkit/core';

export const projectsProjectsDeleteProjectsRegistryProtectionTagRules = defineTool({
  name: 'projects:projects:delete_projects_registry_protection_tag_rules',
  description:
    'Delete a container registry protection tag rule. Deletes a container registry protection tag rule from a project. This feature was introduced in GitLab 18.9.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      protection_rule_id: {
        type: 'integer',
        description: 'ID of the container registry protection tag rule.',
      },
    },
    required: ['id', 'protection_rule_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/registry/protection/tag/rules/{protection_rule_id}',
  },
});
