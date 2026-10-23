import { defineTool } from '@usemcpkit/core';

export const projectsRepositoriesGetProjectsRepositoryChangelog = defineTool({
  name: 'projects:repositories:get_projects_repository_changelog',
  description:
    'Generate changelog data. Generates changelog data based on commits in a repository, without committing them to a changelog file. Works exactly like `POST /projects/:id/repository/changelog`, except the changelog data is not committed to any changelog file.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      version: {
        type: 'string',
        description: 'Version to generate the changelog for. Must follow semantic versioning format.',
      },
      from: {
        type: 'string',
        description:
          'First commit in the range of commits, as a SHA, to use for the changelog. This commit is not included in the changelog. If omitted, the most recent stable version tag before `version` is used.',
      },
      to: {
        type: 'string',
        description:
          'Last commit in the range of commits, as a SHA, to use for the changelog. This commit is included in the changelog. If omitted, uses the latest commit on the default branch. For the Add changelog data to file operation, uses the latest commit on `branch` instead. The range can contain at most 15,000 commits.',
      },
      date: {
        type: 'string',
        description: 'Date and time of the release. Defaults to the current time.',
      },
      trailer: {
        type: 'string',
        default: 'Changelog',
        description:
          'Git trailer to use for including commits. Case-sensitive: `Example` does not match `example` or `eXaMpLE`.',
      },
      config_file: {
        type: 'string',
        description:
          "Path to the changelog configuration file in the project's Git repository. If omitted, uses `.gitlab/changelog_config.yml`.",
      },
      config_file_ref: {
        type: 'string',
        description:
          'Git reference, for example a branch, where the changelog configuration file is defined. Defaults to the default branch of the repository.',
      },
    },
    required: ['id', 'version'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/repository/changelog',
    query: ['version', 'from', 'to', 'date', 'trailer', 'config_file', 'config_file_ref'],
  },
});
