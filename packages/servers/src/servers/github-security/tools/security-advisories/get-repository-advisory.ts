import { defineTool } from '@usemcpkit/core';

export const securityAdvisoriesGetRepositoryAdvisory = defineTool({
  name: 'security_advisories:get_repository_advisory',
  description:
    'Get a repository security advisory. Get a repository security advisory using its GitHub Security Advisory (GHSA) identifier.',
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
      ghsa_id: {
        type: 'string',
        description: 'The GHSA (GitHub Security Advisory) identifier of the advisory.',
      },
    },
    required: ['owner', 'repo', 'ghsa_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/security-advisories/{ghsa_id}',
  },
});
