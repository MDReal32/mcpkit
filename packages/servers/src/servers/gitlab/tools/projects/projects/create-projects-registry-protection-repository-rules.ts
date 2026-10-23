import { defineTool } from '@usemcpkit/core';

export const projectsProjectsCreateProjectsRegistryProtectionRepositoryRules = defineTool({
  name: 'projects:projects:create_projects_registry_protection_repository_rules',
  description:
    'Create a container repository protection rule. Creates a container repository protection rule for a specified project to control who can push or delete container images.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      repository_path_pattern: {
        type: 'string',
        description:
          'Container repository path pattern protected by the protection rule, for example `flight/flight-*`. Wildcard character `*` is allowed.',
      },
      minimum_access_level_for_push: {
        type: 'string',
        description:
          'Minimum GitLab access level required to push container images to the container registry. Must be provided when `minimum_access_level_for_delete` is not set. At least one of `minimum_access_level_for_push`, `minimum_access_level_for_delete` must be provided.',
        enum: ['maintainer', 'owner', 'admin'],
      },
      minimum_access_level_for_delete: {
        type: 'string',
        description:
          'Minimum GitLab access level required to delete container images in the container registry. Must be provided when `minimum_access_level_for_push` is not set. At least one of `minimum_access_level_for_push`, `minimum_access_level_for_delete` must be provided.',
        enum: ['maintainer', 'owner', 'admin'],
      },
    },
    required: ['id', 'repository_path_pattern'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/registry/protection/repository/rules',
    body: ['repository_path_pattern', 'minimum_access_level_for_push', 'minimum_access_level_for_delete'],
  },
});
