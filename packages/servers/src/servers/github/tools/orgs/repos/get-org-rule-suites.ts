import { defineTool } from '@usemcpkit/core';

export const orgsReposGetOrgRuleSuites = defineTool({
  name: 'orgs:repos:get_org_rule_suites',
  description:
    'List organization rule suites. Lists suites of rule evaluations at the organization level. For more information, see "Managing rulesets for repositories in your organization."',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      ref: {
        type: 'string',
        description:
          'The name of the ref. Cannot contain wildcard characters. Optionally prefix with `refs/heads/` to limit to branches or `refs/tags/` to limit to tags. Omit the prefix to search across all refs. When specified, only rule evaluations triggered for this ref will be returned.',
      },
      repository_name: {
        type: 'string',
        description: 'The name of the repository to filter on.',
      },
      time_period: {
        type: 'string',
        default: 'day',
        enum: ['hour', 'day', 'week', 'month'],
        description: 'The time period to filter by.',
      },
      actor_name: {
        type: 'string',
        description:
          'The handle for the GitHub user account to filter on. When specified, only rule evaluations triggered by this actor will be returned.',
      },
      rule_suite_result: {
        type: 'string',
        default: 'all',
        enum: ['pass', 'fail', 'bypass', 'all'],
        description:
          'The rule suite results to filter on. When specified, only suites with this result will be returned.',
      },
      evaluate_status: {
        type: 'string',
        default: 'all',
        enum: ['all', 'active', 'evaluate'],
        description:
          'The evaluate status to filter on. When specified, only rule suites resulting from rulesets with the specified evaluate status will be returned. - `all` - all rule suites will be returned. - `active` - only rule suites resulting from rulesets in active (non-evaluate) mode will be returned. - `evaluate` - only rule suites resulting from rulesets in evaluate mode will be returned.',
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
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/rulesets/rule-suites',
    query: [
      'ref',
      'repository_name',
      'time_period',
      'actor_name',
      'rule_suite_result',
      'evaluate_status',
      'per_page',
      'page',
    ],
  },
});
