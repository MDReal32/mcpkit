import { defineTool } from '@usemcpkit/core';

export const reposReposListCommits = defineTool({
  name: 'repos:repos:list_commits',
  description: 'List commits. **Signature verification object**',
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
      sha: {
        type: 'string',
        description:
          'SHA or branch to start listing commits from. Default: the repository’s default branch (usually `main`).',
      },
      path: {
        type: 'string',
        description: 'Only commits containing this file path will be returned.',
      },
      author: {
        type: 'string',
        description: 'GitHub username or email address to use to filter by commit author.',
      },
      committer: {
        type: 'string',
        description: 'GitHub username or email address to use to filter by commit committer.',
      },
      since: {
        type: 'string',
        description:
          'Only show results that were last updated after the given time. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`. Due to limitations of Git, timestamps must be between 1970-01-01 and 2099-12-31 (inclusive) or unexpected results may be returned.',
      },
      until: {
        type: 'string',
        description:
          'Only commits before this date will be returned. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`. Due to limitations of Git, timestamps must be between 1970-01-01 and 2099-12-31 (inclusive) or unexpected results may be returned.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/commits',
    query: ['sha', 'path', 'author', 'committer', 'since', 'until', 'per_page', 'page'],
  },
});
