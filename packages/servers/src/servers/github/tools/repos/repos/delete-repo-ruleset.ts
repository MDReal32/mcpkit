import { defineTool } from '@usemcpkit/core';

export const reposReposDeleteRepoRuleset = defineTool({
  name: 'repos:repos:delete_repo_ruleset',
  description: 'Delete a repository ruleset. Delete a ruleset for a repository.',
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
      ruleset_id: {
        type: 'integer',
        description: 'The ID of the ruleset.',
      },
    },
    required: ['owner', 'repo', 'ruleset_id'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/rulesets/{ruleset_id}',
  },
});
