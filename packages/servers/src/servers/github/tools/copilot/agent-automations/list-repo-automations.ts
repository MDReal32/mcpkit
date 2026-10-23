import { defineTool } from '@usemcpkit/core';

export const copilotAgentAutomationsListRepoAutomations = defineTool({
  name: 'copilot:agent_automations:list_repo_automations',
  description:
    "List automations for a repository. Returns a paginated list of the authenticated user's automations for a repository, together with every repository-owned automation in it. `total_count` is the number of caller-visible automations matching the supplied filters across all pages. Repository-owned automations are visible to anyone with read access to the repository, so the results are not limited to automations the caller created. Us…",
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository. The name is not case sensitive.',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'The page number of the results to fetch.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description: 'The number of results per page (max 100).',
      },
      owner_type: {
        type: 'string',
        enum: ['user', 'repository'],
        description:
          'Filter automations by owner type. `user` returns automations owned by their creator, `repository` returns automations owned by the repository. Omit to return both.',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/agents/repos/{owner}/{repo}/automations',
    query: ['page', 'per_page', 'owner_type'],
  },
});
