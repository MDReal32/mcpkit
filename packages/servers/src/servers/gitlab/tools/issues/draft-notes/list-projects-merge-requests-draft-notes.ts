import { defineTool } from '@usemcpkit/core';

export const issuesDraftNotesListProjectsMergeRequestsDraftNotes = defineTool({
  name: 'issues:draft_notes:list_projects_merge_requests_draft_notes',
  description: 'List all merge request draft notes. Lists all merge request draft notes.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      merge_request_iid: {
        type: 'integer',
        description: 'Internal ID of the merge request.',
      },
    },
    required: ['id', 'merge_request_iid'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/draft_notes',
  },
});
