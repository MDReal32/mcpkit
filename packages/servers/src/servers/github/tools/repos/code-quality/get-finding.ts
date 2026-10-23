import { defineTool } from '@usemcpkit/core';

export const reposCodeQualityGetFinding = defineTool({
  name: 'repos:code_quality:get_finding',
  description: 'Get a code quality finding. Gets a single code quality finding.',
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
      finding_number: {
        type: 'integer',
        description: 'The number that identifies a finding.',
      },
    },
    required: ['owner', 'repo', 'finding_number'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/code-quality/findings/{finding_number}',
  },
});
