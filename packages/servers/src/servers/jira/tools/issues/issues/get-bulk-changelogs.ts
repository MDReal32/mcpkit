import { defineTool } from '@usemcpkit/core';

export const issuesIssuesGetBulkChangelogs = defineTool({
  name: 'issues:issues:get_bulk_changelogs',
  description: 'Bulk fetch changelogs. Bulk fetch changelogs for multiple issues and filter by fields',
  input: {
    type: 'object',
    properties: {
      fieldIds: {
        type: 'array',
        description: 'List of field IDs to filter changelogs',
        items: {
          type: 'string',
          description: 'List of field IDs to filter changelogs',
        },
      },
      issueIdsOrKeys: {
        type: 'array',
        description: 'List of issue IDs/keys to fetch changelogs for',
        items: {
          type: 'string',
          description: 'List of issue IDs/keys to fetch changelogs for',
        },
      },
      maxResults: {
        type: 'integer',
        description: 'The maximum number of items to return per page',
        default: 1000,
      },
      nextPageToken: {
        type: 'string',
        description: 'The cursor for pagination',
      },
    },
    required: ['issueIdsOrKeys'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/changelog/bulkfetch',
    body: ['fieldIds', 'issueIdsOrKeys', 'maxResults', 'nextPageToken'],
  },
});
