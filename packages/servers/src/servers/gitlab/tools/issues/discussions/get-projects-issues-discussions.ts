import { defineTool } from '@usemcpkit/core';

export const issuesDiscussionsGetProjectsIssuesDiscussions = defineTool({
  name: 'issues:discussions:get_projects_issues_discussions',
  description: 'Retrieve a discussion for an issue. Retrieves a specified discussion for an issue.',
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
    path: '/projects/{id}/issues/{noteable_id}/discussions/{discussion_id}',
  },
});
