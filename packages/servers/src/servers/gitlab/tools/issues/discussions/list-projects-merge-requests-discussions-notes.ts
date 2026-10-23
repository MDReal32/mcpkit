import { defineTool } from '@usemcpkit/core';

export const issuesDiscussionsListProjectsMergeRequestsDiscussionsNotes = defineTool({
  name: 'issues:discussions:list_projects_merge_requests_discussions_notes',
  description:
    'List comments in a merge request discussion. Lists the comments in a specified merge request discussion.',
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
        description: 'ID of the merge request.',
      },
    },
    required: ['id', 'discussion_id', 'noteable_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/merge_requests/{noteable_id}/discussions/{discussion_id}/notes',
  },
});
