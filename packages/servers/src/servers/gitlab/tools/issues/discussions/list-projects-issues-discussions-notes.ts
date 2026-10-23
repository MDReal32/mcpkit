import { defineTool } from '@usemcpkit/core';

export const issuesDiscussionsListProjectsIssuesDiscussionsNotes = defineTool({
  name: 'issues:discussions:list_projects_issues_discussions_notes',
  description: 'List comments in an issue discussion. Lists the comments in a specified issue discussion.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      discussion_id: {
        type: 'string',
        description: 'ID of the discussion.',
      },
      noteable_id: {
        type: 'integer',
        description: 'ID of the issue.',
      },
    },
    required: ['id', 'discussion_id', 'noteable_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/issues/{noteable_id}/discussions/{discussion_id}/notes',
  },
});
