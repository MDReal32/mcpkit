import { defineTool } from '@usemcpkit/core';

export const issuesDiscussionsDeleteProjectsMergeRequestsDiscussionsNotes = defineTool({
  name: 'issues:discussions:delete_projects_merge_requests_discussions_notes',
  description:
    'Delete a comment from a merge request discussion. Deletes a specified comment from a merge request discussion.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      noteable_id: {
        type: 'integer',
        description: 'ID of the merge request.',
      },
      discussion_id: {
        type: 'string',
        description: 'ID of the discussion.',
      },
      note_id: {
        type: 'integer',
        description: 'ID of the discussion note.',
      },
    },
    required: ['id', 'noteable_id', 'discussion_id', 'note_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/merge_requests/{noteable_id}/discussions/{discussion_id}/notes/{note_id}',
  },
});
