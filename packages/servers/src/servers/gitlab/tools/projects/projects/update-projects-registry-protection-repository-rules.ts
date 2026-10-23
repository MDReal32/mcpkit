import { defineTool } from '@usemcpkit/core';

export const projectsProjectsUpdateProjectsRegistryProtectionRepositoryRules = defineTool({
  name: 'projects:projects:update_projects_registry_protection_repository_rules',
  description:
    'Update a container repository protection rule. Updates a container repository protection rule for a specified project.',
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
      repository_path_pattern: {
        type: 'string',
        description:
          'Container repository path pattern protected by the protection rule, for example `flight/flight-*`. Wildcard character `*` is allowed.',
      },
      minimum_access_level_for_push: {
        type: 'string',
        description:
          'Minimum GitLab access level required to push container images to the container registry. At least one of `minimum_access_level_for_push` or `minimum_access_level_for_delete` must stay set. To unset the value, use an empty string (`""`).',
        enum: ['maintainer', 'owner', 'admin', ''],
      },
      minimum_access_level_for_delete: {
        type: 'string',
        description:
          'Minimum GitLab access level required to delete container images in the container registry. At least one of `minimum_access_level_for_push` or `minimum_access_level_for_delete` must stay set. To unset the value, use an empty string (`""`).',
        enum: ['maintainer', 'owner', 'admin', ''],
      },
    },
    required: ['id', 'protection_rule_id'],
  },
  request: {
    method: 'PATCH',
    path: '/projects/{id}/registry/protection/repository/rules/{protection_rule_id}',
    body: ['repository_path_pattern', 'minimum_access_level_for_push', 'minimum_access_level_for_delete'],
  },
});
