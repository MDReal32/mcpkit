import { defineTool } from '@usemcpkit/core';

export const securitySecretScanningListRepoCustomPatterns = defineTool({
  name: 'security:secret_scanning:list_repo_custom_patterns',
  description: 'List repository custom patterns. Lists secret scanning custom patterns for a repository.',
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
      state: {
        type: 'string',
        enum: ['published', 'unpublished'],
        description: 'Filter custom patterns by state. When absent, returns patterns in all states.',
      },
      push_protection: {
        type: 'string',
        enum: ['enabled', 'disabled'],
        description:
          'Filter custom patterns by whether push protection is enabled. When absent, returns patterns regardless of push protection status.',
      },
      sort: {
        type: 'string',
        default: 'created',
        enum: ['created', 'updated', 'name'],
        description: 'The property to sort the results by.',
      },
      direction: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'The direction to sort the results by.',
      },
      before: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results before this cursor. For more information, see "Using pagination in the REST API."',
      },
      after: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results after this cursor. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/secret-scanning/custom-patterns',
    query: ['state', 'push_protection', 'sort', 'direction', 'before', 'after'],
  },
});
