import { defineTool } from '@usemcpkit/core';

export const reposReposGetRepoRuleset = defineTool({
  name: 'repos:repos:get_repo_ruleset',
  description: 'Get a repository ruleset. Get a ruleset for a repository.',
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
      includes_parents: {
        type: 'boolean',
        default: true,
        description: 'Include rulesets configured at higher levels that apply to this repository',
      },
    },
    required: ['owner', 'repo', 'ruleset_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/rulesets/{ruleset_id}',
    query: ['includes_parents'],
  },
});
