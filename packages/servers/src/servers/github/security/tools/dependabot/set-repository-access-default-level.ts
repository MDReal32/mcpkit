import { defineTool } from '@usemcpkit/core';

export const dependabotSetRepositoryAccessDefaultLevel = defineTool({
  name: 'dependabot:set_repository_access_default_level',
  description:
    "Set the default repository access level for Dependabot. Sets the default level of repository access Dependabot will have while performing an update. Available values are: - 'public' - Dependabot will only have access to public repositories, unless access is explicitly granted to non-public repositories. - 'internal' - Dependabot will only have access to public and internal repositories, unless access is explicitly granted to private repositories.",
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      default_level: {
        type: 'string',
        description: 'The default repository access level for Dependabot updates.',
        enum: ['public', 'internal'],
      },
    },
    required: ['org', 'default_level'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/dependabot/repository-access/default-level',
    body: ['default_level'],
  },
});
