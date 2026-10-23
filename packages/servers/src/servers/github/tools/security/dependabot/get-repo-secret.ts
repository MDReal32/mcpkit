import { defineTool } from '@usemcpkit/core';

export const securityDependabotGetRepoSecret = defineTool({
  name: 'security:dependabot:get_repo_secret',
  description: 'Get a repository secret. Gets a single repository secret without revealing its encrypted value.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      secret_name: {
        type: 'string',
        description: 'The name of the secret.',
      },
    },
    required: ['owner', 'repo', 'secret_name'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/dependabot/secrets/{secret_name}',
  },
});
