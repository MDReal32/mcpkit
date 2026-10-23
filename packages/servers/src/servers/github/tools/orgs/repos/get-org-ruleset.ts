import { defineTool } from '@usemcpkit/core';

export const orgsReposGetOrgRuleset = defineTool({
  name: 'orgs:repos:get_org_ruleset',
  description: 'Get an organization repository ruleset. Get a repository ruleset for an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      ruleset_id: {
        type: 'integer',
        description: 'The ID of the ruleset.',
      },
    },
    required: ['org', 'ruleset_id'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/rulesets/{ruleset_id}',
  },
});
