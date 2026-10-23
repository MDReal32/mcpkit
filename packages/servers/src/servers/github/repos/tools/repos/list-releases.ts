import { defineTool } from '@usemcpkit/core';

export const reposListReleases = defineTool({
  name: 'repos:list_releases',
  description:
    'List releases. This returns a list of releases, which does not include regular Git tags that have not been associated with a release. To get a list of Git tags, use the Repository Tags API.',
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
    path: '/repos/{owner}/{repo}/releases',
    query: ['per_page', 'page'],
  },
});
