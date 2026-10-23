import { defineTool } from '@usemcpkit/core';

export const projectsSnippetsUpdateProjectsSnippets = defineTool({
  name: 'projects:snippets:update_projects_snippets',
  description:
    'Update a project snippet. Updates a specified project snippet. The user must have permission to modify snippets. Updates to snippets with multiple files must use the `files` attribute.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      snippet_id: {
        type: 'integer',
        description: 'ID of the snippet.',
      },
      content: {
        type: 'string',
        description:
          'Content of the snippet. Deprecated. Use `files` instead. Mutually exclusive with `files`. At least one of `content`, `description`, `files`, `file_name`, `title`, `visibility` must be provided.',
      },
      description: {
        type: 'string',
        description:
          'Description of the snippet. At least one of `content`, `description`, `files`, `file_name`, `title`, `visibility` must be provided.',
      },
      file_name: {
        type: 'string',
        description:
          'Name of the snippet file. Deprecated. Use `files` instead. Mutually exclusive with `files`. At least one of `content`, `description`, `files`, `file_name`, `title`, `visibility` must be provided.',
      },
      title: {
        type: 'string',
        description:
          'Title of the snippet. At least one of `content`, `description`, `files`, `file_name`, `title`, `visibility` must be provided.',
      },
      visibility: {
        type: 'string',
        description:
          'Visibility level for the snippet. On GitLab.com, the `internal` value is not available. At least one of `content`, `description`, `files`, `file_name`, `title`, `visibility` must be provided.',
        enum: ['private', 'internal', 'public'],
      },
      files: {
        type: 'array',
        description:
          'Array of files to update for the snippet. Required when the snippet has multiple files. Mutually exclusive with `content`, `file_name`. At least one of `content`, `description`, `files`, `file_name`, `title`, `visibility` must be provided.',
        items: {
          type: 'object',
          properties: {
            action: {
              type: 'string',
              description: 'The type of action to perform on the file, must be one of: create, update, delete, move',
              enum: ['create', 'update', 'delete', 'move'],
            },
            content: {
              type: 'string',
              description: 'Content of the snippet file.',
            },
            file_path: {
              type: 'string',
              description: 'Path of the snippet file.',
            },
            previous_path: {
              type: 'string',
              description: 'Previous path of the snippet file.',
            },
          },
          required: ['action'],
        },
      },
    },
    required: ['id', 'snippet_id'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/snippets/{snippet_id}',
    body: ['content', 'description', 'file_name', 'title', 'visibility', 'files'],
  },
});
