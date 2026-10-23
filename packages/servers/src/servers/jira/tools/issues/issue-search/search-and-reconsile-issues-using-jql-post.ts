import { defineTool } from '@usemcpkit/core';

export const issuesIssueSearchSearchAndReconsileIssuesUsingJqlPost = defineTool({
  name: 'issues:issue_search:search_and_reconsile_issues_using_jql_post',
  description:
    'Search for issues using JQL enhanced search (POST). Searches for issues using JQL. Recent updates might not be immediately visible in the returned search results. If you need read-after-write consistency, you can utilize the `reconcileIssues` parameter to ensure stronger consistency assurances. This operation can be accessed anonymously.',
  input: {
    type: 'object',
    properties: {
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information about issues in the response. Note that, unlike the majority of instances where `expand` is specified, `expand` is defined as a comma-delimited string of values. The expand options are:',
      },
      fields: {
        type: 'array',
        description:
          'A list of fields to return for each issue. Use it to retrieve a subset of fields. This parameter accepts a comma-separated list. Expand options include:',
        items: {
          type: 'string',
        },
      },
      fieldsByKeys: {
        type: 'boolean',
        description: 'Reference fields by their key (rather than ID). The default is `false`.',
      },
      includeArchivedProjects: {
        type: 'boolean',
        description:
          'Whether to also return issues that belong to archived projects. Archived projects are excluded by default. Requires *Browse projects* permission on the archived project. The default is `false`. (Jira Cloud only)',
      },
      jql: {
        type: 'string',
        description:
          'A JQL expression. For performance reasons, this parameter requires a bounded query. A bounded query is a query with a search restriction.',
      },
      maxResults: {
        type: 'integer',
        description:
          'The maximum number of items to return per page. To manage page size, API may return fewer items per page where a large number of fields are requested. The greatest number of items returned per page is achieved when requesting `id` or `key` only. It returns max 5000 issues.',
        default: 50,
      },
      nextPageToken: {
        type: 'string',
        description:
          'The token for a page to fetch that is not the first page. The first page has a `nextPageToken` of `null`. Use the `nextPageToken` to fetch the next page of issues. (Jira Cloud only)',
      },
      properties: {
        type: 'array',
        description:
          'A list of up to 5 issue properties to include in the results. This parameter accepts a comma-separated list.',
        items: {
          type: 'string',
        },
      },
      reconcileIssues: {
        type: 'array',
        description:
          'Strong consistency issue ids to be reconciled with search results. Accepts max 50 ids. This list of ids should be consistent with each paginated request across different pages. (Jira Cloud only)',
        items: {
          type: 'integer',
        },
      },
      startAt: {
        type: 'integer',
        description:
          'The index of the first item to return in the page of results (page offset). The base index is `0`. (Data Center only)',
      },
      validateQuery: {
        type: 'string',
        description:
          'Determines how to validate the JQL query and treat the validation results. Supported values: (Data Center only)',
        enum: ['strict', 'warn', 'none', 'true', 'false'],
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/search',
    body: ['expand', 'fields', 'fieldsByKeys', 'jql', 'maxResults', 'properties', 'startAt', 'validateQuery'],
  },
  editions: {
    cloud: {
      request: {
        method: 'POST',
        path: '/rest/api/2/search/jql',
        body: [
          'expand',
          'fields',
          'fieldsByKeys',
          'includeArchivedProjects',
          'jql',
          'maxResults',
          'nextPageToken',
          'properties',
          'reconcileIssues',
        ],
      },
    },
  },
});
