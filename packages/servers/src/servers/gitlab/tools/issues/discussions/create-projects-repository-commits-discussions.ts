import { defineTool } from '@usemcpkit/core';

export const issuesDiscussionsCreateProjectsRepositoryCommitsDiscussions = defineTool({
  name: 'issues:discussions:create_projects_repository_commits_discussions',
  description:
    'Create a commit discussion. Creates a discussion for a specified commit. Replies can be added to it later.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      noteable_id: {
        type: 'string',
        description: 'ID of the commit.',
      },
      body: {
        type: 'string',
        description: 'Content of the note or reply.',
      },
      created_at: {
        type: 'string',
        description:
          'Date and time the note was created, in ISO 8601 format such as `2016-03-11T03:45:40Z`. Requires administrator or project/group owner rights.',
      },
      position: {
        type: 'object',
        description: 'Position when creating a note',
        properties: {
          base_sha: {
            type: 'string',
            description: 'Base commit SHA in the source branch',
          },
          start_sha: {
            type: 'string',
            description: 'SHA referencing commit in target branch',
          },
          head_sha: {
            type: 'string',
            description: 'SHA referencing HEAD of this merge request',
          },
          position_type: {
            type: 'string',
            description: 'Type of the position reference',
            enum: ['text', 'image', 'file'],
          },
          new_path: {
            type: 'string',
            description: 'File path after change',
          },
          new_line: {
            type: 'integer',
            description: 'Line number after change',
          },
          old_path: {
            type: 'string',
            description: 'File path before change',
          },
          old_line: {
            type: 'integer',
            description: 'Line number before change',
          },
          width: {
            type: 'integer',
            description: 'Width of the image',
          },
          height: {
            type: 'integer',
            description: 'Height of the image',
          },
          x: {
            type: 'integer',
            description: 'X coordinate in the image',
          },
          y: {
            type: 'integer',
            description: 'Y coordinate in the image',
          },
        },
        required: ['base_sha', 'start_sha', 'head_sha', 'position_type'],
      },
    },
    required: ['id', 'noteable_id', 'body'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/repository/commits/{noteable_id}/discussions',
    body: ['body', 'created_at', 'position'],
  },
});
