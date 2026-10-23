import { defineTool } from '@usemcpkit/core';

export const issuesJqlGetAuditEntries = defineTool({
  name: 'issues:jql:get_audit_entries',
  description:
    'Get invalid JQL searches. Returns JQL searches that need updating because Jira can no longer support them. Use the entries to find affected saved filters and JQL used by apps, automations, scripts, or REST integrations.',
  input: {
    type: 'object',
    properties: {
      userAccountId: {
        type: 'string',
        description: 'The optional external account ID used to restrict the entries returned.',
      },
      nextPageToken: {
        type: 'string',
        description: 'The token returned by a previous response to retrieve the next page.',
      },
      maxResults: {
        type: 'integer',
        description: 'The maximum number of entries to return, from 1 to 100 and defaulting to 50.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/invalid-jqls-access-log',
    query: ['userAccountId', 'nextPageToken', 'maxResults'],
  },
});
