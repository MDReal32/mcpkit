import { defineTool } from '@usemcpkit/core';

export const projectsRepositoriesCreateProjectsRepositoryChangelog = defineTool({
  name: 'projects:repositories:create_projects_repository_changelog',
  description: 'Add changelog data to file. Adds changelog data to file.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
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
        description:
          'Git trailer to use for including commits. Case-sensitive: `Example` does not match `example` or `eXaMpLE`.',
        default: 'Changelog',
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
      branch: {
        type: 'string',
        description:
          "Name of the branch to commit the changelog changes to. If omitted, defaults to the project's default branch.",
      },
      file: {
        type: 'string',
        description: 'File to commit the changes to.',
        default: 'CHANGELOG.md',
      },
      message: {
        type: 'string',
        description:
          'Commit message to use when committing the changelog changes. If omitted, defaults to `Add changelog for version X`, where `X` is the value of the `version` parameter.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/repository/changelog',
    body: ['from', 'to', 'date', 'trailer', 'config_file', 'config_file_ref', 'branch', 'file', 'message'],
  },
});
