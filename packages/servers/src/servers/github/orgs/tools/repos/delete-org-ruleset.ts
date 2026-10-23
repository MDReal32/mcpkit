import { defineTool } from '@usemcpkit/core';

export const reposDeleteOrgRuleset = defineTool({
  name: 'repos:delete_org_ruleset',
  description: 'Delete an organization repository ruleset. Delete a ruleset for an organization.',
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
    method: 'DELETE',
    path: '/orgs/{org}/rulesets/{ruleset_id}',
  },
});
