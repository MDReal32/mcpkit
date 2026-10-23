import { defineTool } from '@usemcpkit/core';

export const issuesIssuesGetIssueAdfLimitReport = defineTool({
  name: 'issues:issues:get_issue_adf_limit_report',
  description:
    'Get issue adf limit report. Returns all issues whose ADF (rich text) field data breaches the universal ADF size limit.',
  input: {
    type: 'object',
    properties: {
      isReturningKeys: {
        type: 'boolean',
        default: false,
        description: 'Return issue keys instead of issue ids in the response.',
      },
      fieldType: {
        type: 'string',
        description:
          'Restrict the report to the given ADF field types. Defaults to every ADF field type. (comma-separated)',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issue/limit/adf/report',
    query: ['isReturningKeys', 'fieldType'],
  },
});
