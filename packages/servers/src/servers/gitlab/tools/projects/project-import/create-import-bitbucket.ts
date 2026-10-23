import { defineTool } from '@usemcpkit/core';

export const projectsProjectImportCreateImportBitbucket = defineTool({
  name: 'projects:project_import:create_import_bitbucket',
  description:
    'Import repository from Bitbucket Cloud. Imports a repository from Bitbucket Cloud to GitLab. Prerequisites: - The prerequisites for Bitbucket Cloud importer. This feature was introduced in GitLab 17.0.',
  input: {
    type: 'object',
    properties: {
      bitbucket_email: {
        type: 'string',
        description: 'Bitbucket Cloud email.',
      },
      bitbucket_api_token: {
        type: 'string',
        description: 'Bitbucket Cloud API token.',
      },
      repo_path: {
        type: 'string',
        description: 'Path to the repository.',
      },
      target_namespace: {
        type: 'string',
        description: 'Namespace to import the repository into. Supports subgroups, for example `/namespace/subgroup`.',
      },
      new_name: {
        type: 'string',
        description:
          'Name of the new project. Also used as the new path, so it must not start or end with a special character and must not contain consecutive special characters.',
      },
    },
    required: ['bitbucket_email', 'bitbucket_api_token', 'repo_path', 'target_namespace'],
  },
  request: {
    method: 'POST',
    path: '/import/bitbucket',
    body: ['bitbucket_email', 'bitbucket_api_token', 'repo_path', 'target_namespace', 'new_name'],
  },
});
