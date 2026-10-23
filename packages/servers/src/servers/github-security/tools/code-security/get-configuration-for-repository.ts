import { defineTool } from '@usemcpkit/core';

export const codeSecurityGetConfigurationForRepository = defineTool({
  name: 'code_security:get_configuration_for_repository',
  description:
    "Get the code security configuration associated with a repository. Get the code security configuration that manages a repository's code security settings.",
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
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/code-security-configuration',
  },
});
