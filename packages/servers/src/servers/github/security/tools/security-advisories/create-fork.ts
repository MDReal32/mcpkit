import { defineTool } from '@usemcpkit/core';

export const securityAdvisoriesCreateFork = defineTool({
  name: 'security_advisories:create_fork',
  description:
    'Create a temporary private fork. Create a temporary private fork to collaborate on fixing a security vulnerability in a repository.',
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
    method: 'POST',
    path: '/repos/{owner}/{repo}/security-advisories/{ghsa_id}/forks',
  },
});
