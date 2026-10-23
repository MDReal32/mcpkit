import { defineTool } from '@usemcpkit/core';

export const projectsProjectsCreateProjectsRegistryProtectionTagRules = defineTool({
  name: 'projects:projects:create_projects_registry_protection_tag_rules',
  description:
    'Create a container registry protection tag rule. Creates a container registry protection tag rule for a project to control who can push or delete container tags. This feature was introduced in GitLab 18.8.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      tag_name_pattern: {
        type: 'string',
        description:
          'Container tag name pattern protected by the protection rule, for example `v*-release`. Wildcard character `*` is allowed.',
      },
      minimum_access_level_for_push: {
        type: 'string',
        description: 'Minimum GitLab access level required to push container tags.',
        enum: ['maintainer', 'owner', 'admin'],
      },
      minimum_access_level_for_delete: {
        type: 'string',
        description: 'Minimum GitLab access level required to delete container tags.',
        enum: ['maintainer', 'owner', 'admin'],
      },
    },
    required: ['id', 'tag_name_pattern', 'minimum_access_level_for_push', 'minimum_access_level_for_delete'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/registry/protection/tag/rules',
    body: ['tag_name_pattern', 'minimum_access_level_for_push', 'minimum_access_level_for_delete'],
  },
});
