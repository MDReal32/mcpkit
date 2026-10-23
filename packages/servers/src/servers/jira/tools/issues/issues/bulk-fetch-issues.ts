import { defineTool } from '@usemcpkit/core';

export const issuesIssuesBulkFetchIssues = defineTool({
  name: 'issues:issues:bulk_fetch_issues',
  description: 'Bulk fetch issues. Returns the details for a set of requested issues.',
  input: {
    type: 'object',
    properties: {
      expand: {
        type: 'array',
        description:
          'Use expand to include additional information about issues in the response. Note that, unlike the majority of instances where `expand` is specified, `expand` is defined as a list of values. The expand options are:',
        items: {
          type: 'string',
        },
      },
      fields: {
        type: 'array',
        description:
          'A list of fields to return for each issue, use it to retrieve a subset of fields. This parameter accepts a comma-separated list. Expand options include:',
        items: {
          type: 'string',
        },
      },
      fieldsByKeys: {
        type: 'boolean',
        description: 'Reference fields by their key (rather than ID). The default is `false`.',
      },
      issueIdsOrKeys: {
        type: 'array',
        description:
          'An array of issue IDs or issue keys to fetch. You can mix issue IDs and keys in the same query. You can request up to 100 issues per call. Requests can include up to 1000 issues per call when they meet all of the conditions described for the `fields` and `expand` parameters. Requests that exceed the applicable limit are rejected with a 400 error.',
        items: {
          type: 'string',
        },
      },
      properties: {
        type: 'array',
        description:
          'A list of issue property keys of issue properties to be included in the results. A maximum of 5 issue property keys can be specified.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['issueIdsOrKeys'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/issue/bulkfetch',
    body: ['expand', 'fields', 'fieldsByKeys', 'issueIdsOrKeys', 'properties'],
  },
});
