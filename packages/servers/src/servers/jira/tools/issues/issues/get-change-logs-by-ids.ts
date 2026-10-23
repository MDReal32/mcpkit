import { defineTool } from '@usemcpkit/core';

export const issuesIssuesGetChangeLogsByIds = defineTool({
  name: 'issues:issues:get_change_logs_by_ids',
  description: 'Get changelogs by IDs. Returns changelogs for an issue specified by a list of changelog IDs.',
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'The ID or key of the issue.',
      },
      changelogIds: {
        type: 'array',
        description: 'The list of changelog IDs.',
        items: {
          type: 'integer',
        },
      },
    },
    required: ['issueIdOrKey', 'changelogIds'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/issue/{issueIdOrKey}/changelog/list',
    body: ['changelogIds'],
  },
});
