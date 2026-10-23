import { defineTool } from '@usemcpkit/core';

export const issuesNotesCreateGroupsWikiPagesNotes = defineTool({
  name: 'issues:notes:create_groups_wiki_pages_notes',
  description: 'Create a wiki page meta note. Creates a note for a wiki page meta.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      noteable_id: {
        type: 'integer',
        description: 'ID of the resource the note is attached to.',
      },
      body: {
        type: 'string',
        description: 'Content of the note. Limited to 1,000,000 characters.',
      },
      confidential: {
        type: 'boolean',
        description: 'If `true`, marks the note as internal. Deprecated. Use `internal` instead.',
      },
      internal: {
        type: 'boolean',
        description: 'Internal note flag.',
        default: false,
      },
      created_at: {
        type: 'string',
        description:
          'Date and time the note was created, in ISO 8601 format such as `2016-03-11T03:45:40Z`. Requires administrator or project/group owner rights.',
      },
      merge_request_diff_head_sha: {
        type: 'string',
        description:
          "SHA of the head commit, which ensures the merge request wasn't updated after the API request was sent. Required for the `/merge` quick action.",
      },
    },
    required: ['id', 'noteable_id', 'body'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/wiki_pages/{noteable_id}/notes',
    body: ['body', 'confidential', 'internal', 'created_at', 'merge_request_diff_head_sha'],
  },
});
