import { defineTool } from '@usemcpkit/core';

export const orgsOrgsGetOrgRulesetVersion = defineTool({
  name: 'orgs:orgs:get_org_ruleset_version',
  description: 'Get organization ruleset version. Get a version of an organization ruleset.',
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
      version_id: {
        type: 'integer',
        description: 'The ID of the version',
      },
    },
    required: ['org', 'ruleset_id', 'version_id'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/rulesets/{ruleset_id}/history/{version_id}',
  },
});
