import { defineTool } from '@usemcpkit/core';

export const reposListIssueTypes = defineTool({
  name: 'repos:list_issue_types',
  description:
    'List issue types for a repository. Lists enabled issue types inherited from the repository owner. OAuth app tokens and personal access tokens (classic) need the `repo` scope to use this endpoint. Fine-grained access tokens require the "Metadata" repository permission (read).',
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
    path: '/repos/{owner}/{repo}/issue-types',
  },
});
