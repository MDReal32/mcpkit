import { defineTool } from '@usemcpkit/core';

export const projectsImportsCreateImportGithubGists = defineTool({
  name: 'projects:imports:create_import_github_gists',
  description:
    'Import GitHub gists into GitLab snippets. Imports personal GitHub gists into GitLab snippets. You can import gists with up to 10 files. GitHub gists with more than 10 files are skipped. You should manually migrate these GitHub gists. If any gists cannot be imported, an email is sent with a list of gists that were not imported.',
  input: {
    type: 'object',
    properties: {
      personal_access_token: {
        type: 'string',
        description: 'GitHub personal access token.',
      },
    },
    required: ['personal_access_token'],
  },
  request: {
    method: 'POST',
    path: '/import/github/gists',
    body: ['personal_access_token'],
  },
});
