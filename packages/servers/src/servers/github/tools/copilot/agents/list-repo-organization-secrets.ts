import { defineTool } from '@usemcpkit/core';

export const copilotAgentsListRepoOrganizationSecrets = defineTool({
  name: 'copilot:agents:list_repo_organization_secrets',
  description:
    'List repository organization secrets. Lists all organization secrets shared with a repository without revealing their encrypted values.',
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
    path: '/repos/{owner}/{repo}/agents/organization-secrets',
    query: ['per_page', 'page'],
  },
});
