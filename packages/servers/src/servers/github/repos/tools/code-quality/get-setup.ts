import { defineTool } from '@usemcpkit/core';

export const codeQualityGetSetup = defineTool({
  name: 'code_quality:get_setup',
  description: 'Get a code quality setup configuration. Gets a code quality setup configuration.',
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
    path: '/repos/{owner}/{repo}/code-quality/setup',
  },
});
