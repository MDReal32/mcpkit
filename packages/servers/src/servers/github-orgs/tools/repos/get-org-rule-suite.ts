import { defineTool } from '@usemcpkit/core';

export const reposGetOrgRuleSuite = defineTool({
  name: 'repos:get_org_rule_suite',
  description:
    'Get an organization rule suite. Gets information about a suite of rule evaluations from within an organization. For more information, see "Managing rulesets for repositories in your organization."',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      rule_suite_id: {
        type: 'integer',
        description:
          'The unique identifier of the rule suite result. To get this ID, you can use GET /repos/{owner}/{repo}/rulesets/rule-suites for repositories and GET /orgs/{org}/rulesets/rule-suites for organizations.',
      },
      include_metadata: {
        type: 'boolean',
        default: false,
        description:
          'When set to `true`, the response will include additional metadata for pull request and required status check rule evaluation. Results are capped at 50 entries.',
      },
    },
    required: ['org', 'rule_suite_id'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/rulesets/rule-suites/{rule_suite_id}',
    query: ['include_metadata'],
  },
});
