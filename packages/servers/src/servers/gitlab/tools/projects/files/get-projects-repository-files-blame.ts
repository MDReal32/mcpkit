import { defineTool } from '@usemcpkit/core';

export const projectsFilesGetProjectsRepositoryFilesBlame = defineTool({
  name: 'projects:files:get_projects_repository_files_blame',
  description:
    'Retrieve file blame history from a repository. Retrieves blame history for a specified file in a repository. Each blame range contains lines and their corresponding commit information. This endpoint is rate-limited for each authenticated user for a given project, and for each IP address for unauthenticated requests. On GitLab Self-Managed and GitLab Dedicated, an administrator can change these limits in the application settings.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      file_path: {
        type: 'string',
        description: 'URL-encoded full path to the file, for example `lib%2Fclass%2Erb`.',
      },
      ref: {
        type: 'string',
        description: 'Commit SHA or name of a repository branch or tag.',
      },
      range: {
        type: 'object',
        description: 'Range of lines to return blame information for.',
      },
      range_start: {
        type: 'integer',
        description: 'First line number of the range to blame.',
      },
      range_end: {
        type: 'integer',
        description: 'Last line number of the range to blame.',
      },
    },
    required: ['id', 'file_path', 'ref', 'range_start', 'range_end'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/repository/files/{file_path}/blame',
    query: {
      ref: 'ref',
      range: 'range',
      'range[start]': 'range_start',
      'range[end]': 'range_end',
    },
  },
});
