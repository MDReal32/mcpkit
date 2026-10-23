import { defineTool } from '@usemcpkit/core';

export const dependabotListAlertsForEnterprise = defineTool({
  name: 'dependabot:list_alerts_for_enterprise',
  description:
    'List Dependabot alerts for an enterprise. Lists Dependabot alerts for repositories that are owned by the specified enterprise.',
  input: {
    type: 'object',
    properties: {
      enterprise: {
        type: 'string',
        description: 'The slug version of the enterprise name.',
      },
      classification: {
        type: 'string',
        description:
          'A comma-separated list of vulnerability classifications. If specified, only alerts for vulnerabilities with these classifications will be returned.',
      },
      state: {
        type: 'string',
        description: 'A comma-separated list of states. If specified, only alerts with these states will be returned.',
      },
      severity: {
        type: 'string',
        description:
          'A comma-separated list of severities. If specified, only alerts with these severities will be returned.',
      },
      ecosystem: {
        type: 'string',
        description:
          'A comma-separated list of ecosystems. If specified, only alerts for these ecosystems will be returned.',
      },
      package: {
        type: 'string',
        description:
          'A comma-separated list of package names. If specified, only alerts for these packages will be returned.',
      },
      epss_percentage: {
        type: 'string',
        description:
          'CVE Exploit Prediction Scoring System (EPSS) percentage. Can be specified as: - An exact number (`n`) - Comparators such as `>n`, `<n`, `>=n`, `<=n` - A range like `n..n`, where `n` is a number from 0.0 to 1.0',
      },
      has: {
        description:
          'Filters the list of alerts based on whether the alert has the given value. If specified, only alerts meeting this criterion will be returned. Multiple `has` filters can be passed to filter for alerts that have all of the values. Currently, only `patch` is supported.',
      },
      assignee: {
        type: 'string',
        description:
          'Filter alerts by assignees. Provide a comma-separated list of user handles (e.g., `octocat` or `octocat,hubot`) to return alerts assigned to any of the specified users. Use `*` to list alerts with at least one assignee or `none` to list alerts with no assignees.',
      },
      scope: {
        type: 'string',
        enum: ['development', 'runtime'],
        description:
          'The scope of the vulnerable dependency. If specified, only alerts with this scope will be returned.',
      },
      relationship: {
        type: 'string',
        description:
          'A comma-separated list of relationships of the vulnerable dependency to your project. If specified, only alerts with these relationships will be returned.',
      },
      sort: {
        type: 'string',
        default: 'created',
        enum: ['created', 'updated', 'epss_percentage'],
        description:
          "The property by which to sort the results. `created` means when the alert was created. `updated` means when the alert's state last changed. `epss_percentage` sorts alerts by the Exploit Prediction Scoring System (EPSS) percentage.",
      },
      direction: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'The direction to sort the results by.',
      },
      before: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results before this cursor. For more information, see "Using pagination in the REST API."',
      },
      after: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results after this cursor. For more information, see "Using pagination in the REST API."',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['enterprise'],
  },
  request: {
    method: 'GET',
    path: '/enterprises/{enterprise}/dependabot/alerts',
    query: [
      'classification',
      'state',
      'severity',
      'ecosystem',
      'package',
      'epss_percentage',
      'has',
      'assignee',
      'scope',
      'relationship',
      'sort',
      'direction',
      'before',
      'after',
      'per_page',
    ],
  },
});
