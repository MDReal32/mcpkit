import { defineTool } from '@usemcpkit/core';

export const issuesDraftNotesCreateProjectsMergeRequestsDraftNotes = defineTool({
  name: 'issues:draft_notes:create_projects_merge_requests_draft_notes',
  description: 'Create a draft note. Creates a draft note for a specified merge request.',
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
      note: {
        type: 'string',
        description: 'Content of the note.',
      },
      in_reply_to_discussion_id: {
        type: 'string',
        description: 'ID of the discussion the draft note replies to.',
      },
      commit_id: {
        type: 'string',
        description: 'SHA of the commit to associate the draft note with.',
      },
      resolve_discussion: {
        type: 'boolean',
        description: 'If `true`, resolves the associated discussion.',
      },
      position: {
        type: 'object',
        description: 'Position when creating a diff note. If omitted, creates a regular discussion note.',
        properties: {
          base_sha: {
            type: 'string',
            description: 'Base commit SHA of the diff.',
          },
          start_sha: {
            type: 'string',
            description: 'SHA of the latest commit in the target branch.',
          },
          head_sha: {
            type: 'string',
            description: 'SHA of the latest commit in the source branch.',
          },
          position_type: {
            type: 'string',
            description: 'Type of the position reference.',
            enum: ['text', 'image', 'file'],
          },
          new_path: {
            type: 'string',
            description: 'File path after the change.',
          },
          new_line: {
            type: 'integer',
            description: 'Line number after the change.',
          },
          old_path: {
            type: 'string',
            description: 'File path before the change.',
          },
          old_line: {
            type: 'integer',
            description: 'Line number before the change.',
          },
          width: {
            type: 'integer',
            description: 'Width of the image.',
          },
          height: {
            type: 'integer',
            description: 'Height of the image.',
          },
          x: {
            type: 'integer',
            description: 'X coordinate in the image.',
          },
          y: {
            type: 'integer',
            description: 'Y coordinate in the image.',
          },
          line_range: {
            type: 'object',
            description: 'Line range for a multi-line note.',
            properties: {
              start: {
                type: 'object',
                description: 'Start line for a multi-line note.',
              },
              end: {
                type: 'object',
                description: 'End line for a multi-line note.',
              },
            },
          },
        },
        required: ['base_sha', 'start_sha', 'head_sha', 'position_type'],
      },
    },
    required: ['id', 'merge_request_iid', 'note'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/draft_notes',
    body: ['note', 'in_reply_to_discussion_id', 'commit_id', 'resolve_discussion', 'position'],
  },
});
