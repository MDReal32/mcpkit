import { defineTool } from '@usemcpkit/core';

export const migrationsStartImport = defineTool({
  name: 'migrations:start_import',
  description:
    '[Deprecated] Start an import. Start a source import to a GitHub repository using GitHub Importer. Importing into a GitHub repository with GitHub Actions enabled is not supported and will return a status `422 Unprocessable Entity` response.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      vcs_url: {
        type: 'string',
        description: 'The URL of the originating repository.',
      },
      vcs: {
        type: 'string',
        description:
          'The originating VCS type. Without this parameter, the import job will take additional time to detect the VCS type before beginning the import. This detection step will be reflected in the response.',
        enum: ['subversion', 'git', 'mercurial', 'tfvc'],
      },
      vcs_username: {
        type: 'string',
        description: 'If authentication is required, the username to provide to `vcs_url`.',
      },
      vcs_password: {
        type: 'string',
        description: 'If authentication is required, the password to provide to `vcs_url`.',
      },
      tfvc_project: {
        type: 'string',
        description: 'For a tfvc import, the name of the project that is being imported.',
      },
    },
    required: ['owner', 'repo', 'vcs_url'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/import',
    body: ['vcs_url', 'vcs', 'vcs_username', 'vcs_password', 'tfvc_project'],
  },
});
