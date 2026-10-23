import { defineTool } from '@usemcpkit/core';

export const gistsUpdate = defineTool({
  name: 'gists:update',
  description:
    "Update a gist. Allows you to update a gist's description and to update, delete, or rename gist files. Files from the previous version of the gist that aren't explicitly changed during an edit are unchanged.",
  input: {
    type: 'object',
    properties: {
      gist_id: {
        type: 'string',
        description: 'The unique identifier of the gist.',
      },
      description: {
        type: 'string',
        description: 'The description of the gist.',
      },
      files: {
        type: 'object',
        description:
          'The gist files to be updated, renamed, or deleted. Each `key` must match the current filename (including extension) of the targeted gist file. For example: `hello.py`.',
      },
    },
    required: ['gist_id'],
  },
  request: {
    method: 'PATCH',
    path: '/gists/{gist_id}',
    body: ['description', 'files'],
  },
});
