import { defineTool } from '@usemcpkit/core';

export const issuesDiscussionsGetProjectsRepositoryCommitsDiscussions = defineTool({
  name: 'issues:discussions:get_projects_repository_commits_discussions',
  description: 'Retrieve a discussion for a commit. Retrieves a specified discussion for a commit.',
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
        type: 'string',
        description: 'ID of the commit.',
      },
    },
    required: ['id', 'discussion_id', 'noteable_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/repository/commits/{noteable_id}/discussions/{discussion_id}',
  },
});
