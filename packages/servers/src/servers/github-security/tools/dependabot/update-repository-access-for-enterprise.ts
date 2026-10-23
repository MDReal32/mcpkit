import { defineTool } from '@usemcpkit/core';

export const dependabotUpdateRepositoryAccessForEnterprise = defineTool({
  name: 'dependabot:update_repository_access_for_enterprise',
  description:
    "Updates Dependabot's repository access list for an enterprise. Updates repositories according to the list of repositories that enterprise admins have given Dependabot access to when they've updated dependencies across organizations in the enterprise.",
  input: {
    type: 'object',
    properties: {
      enterprise: {
        type: 'string',
        description: 'The slug version of the enterprise name.',
      },
      repository_ids_to_add: {
        type: 'array',
        description: 'List of repository IDs to add.',
        items: {
          type: 'integer',
        },
      },
      repository_ids_to_remove: {
        type: 'array',
        description: 'List of repository IDs to remove.',
        items: {
          type: 'integer',
        },
      },
    },
    required: ['enterprise'],
  },
  request: {
    method: 'PATCH',
    path: '/enterprises/{enterprise}/dependabot/repository-access',
    body: ['repository_ids_to_add', 'repository_ids_to_remove'],
  },
});
