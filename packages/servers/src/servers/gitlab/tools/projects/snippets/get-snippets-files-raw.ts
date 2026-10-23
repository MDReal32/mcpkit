import { defineTool } from '@usemcpkit/core';

export const projectsSnippetsGetSnippetsFilesRaw = defineTool({
  name: 'projects:snippets:get_snippets_files_raw',
  description: 'Retrieve snippet file content. Retrieves the raw file content from a snippet as plain text.',
  input: {
    type: 'object',
    properties: {
      ref: {
        type: 'string',
        description: 'The name of branch, tag or commit',
      },
      file_path: {
        type: 'string',
        description: 'The URL-encoded path to the file, like lib%2Fclass%2Erb',
      },
      id: {
        type: 'string',
        description: 'ID of the snippet.',
      },
    },
    required: ['ref', 'file_path', 'id'],
  },
  request: {
    method: 'GET',
    path: '/snippets/{id}/files/{ref}/{file_path}/raw',
  },
});
