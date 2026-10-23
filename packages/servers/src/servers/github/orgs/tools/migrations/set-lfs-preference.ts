import { defineTool } from '@usemcpkit/core';

export const migrationsSetLfsPreference = defineTool({
  name: 'migrations:set_lfs_preference',
  description:
    '[Deprecated] Update Git LFS preference. You can import repositories from Subversion, Mercurial, and TFS that include files larger than 100MB. This ability is powered by Git LFS.',
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
      use_lfs: {
        type: 'string',
        description:
          'Whether to store large files during the import. `opt_in` means large files will be stored using Git LFS. `opt_out` means large files will be removed during the import.',
        enum: ['opt_in', 'opt_out'],
      },
    },
    required: ['owner', 'repo', 'use_lfs'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/import/lfs',
    body: ['use_lfs'],
  },
});
