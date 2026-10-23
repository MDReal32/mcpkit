import { defineTool } from '@usemcpkit/core';

export const reposCreateInOrg = defineTool({
  name: 'repos:create_in_org',
  description:
    'Create an organization repository. Creates a new repository in the specified organization. The authenticated user must be a member of the organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      name: {
        type: 'string',
        description: 'The name of the repository.',
      },
      description: {
        type: 'string',
        description: 'A short description of the repository.',
      },
      homepage: {
        type: 'string',
        description: 'A URL with more information about the repository.',
      },
      private: {
        type: 'boolean',
        description: 'Whether the repository is private.',
        default: false,
      },
      visibility: {
        type: 'string',
        description: 'The visibility of the repository.',
        enum: ['public', 'private'],
      },
      has_issues: {
        type: 'boolean',
        description: 'Either `true` to enable issues for this repository or `false` to disable them.',
        default: true,
      },
      has_projects: {
        type: 'boolean',
        description:
          "Either `true` to enable projects for this repository or `false` to disable them. **Note:** If you're creating a repository in an organization that has disabled repository projects, the default is `false`, and if you pass `true`, the API returns an error.",
        default: true,
      },
      has_wiki: {
        type: 'boolean',
        description: 'Either `true` to enable the wiki for this repository or `false` to disable it.',
        default: true,
      },
      has_downloads: {
        type: 'boolean',
        description: 'Whether downloads are enabled.',
        default: true,
      },
      is_template: {
        type: 'boolean',
        description: 'Either `true` to make this repo available as a template repository or `false` to prevent it.',
        default: false,
      },
      team_id: {
        type: 'integer',
        description:
          'The id of the team that will be granted access to this repository. This is only valid when creating a repository in an organization.',
      },
      auto_init: {
        type: 'boolean',
        description: 'Pass `true` to create an initial commit with empty README.',
        default: false,
      },
      gitignore_template: {
        type: 'string',
        description:
          'Desired language or platform .gitignore template to apply. Use the name of the template without the extension. For example, "Haskell".',
      },
      license_template: {
        type: 'string',
        description:
          'Choose an open source license template that best suits your needs, and then use the license keyword as the `license_template` string. For example, "mit" or "mpl-2.0".',
      },
      allow_squash_merge: {
        type: 'boolean',
        description: 'Either `true` to allow squash-merging pull requests, or `false` to prevent squash-merging.',
        default: true,
      },
      allow_merge_commit: {
        type: 'boolean',
        description:
          'Either `true` to allow merging pull requests with a merge commit, or `false` to prevent merging pull requests with merge commits.',
        default: true,
      },
      allow_rebase_merge: {
        type: 'boolean',
        description: 'Either `true` to allow rebase-merging pull requests, or `false` to prevent rebase-merging.',
        default: true,
      },
      allow_auto_merge: {
        type: 'boolean',
        description: 'Either `true` to allow auto-merge on pull requests, or `false` to disallow auto-merge.',
        default: false,
      },
      delete_branch_on_merge: {
        type: 'boolean',
        description:
          'Either `true` to allow automatically deleting head branches when pull requests are merged, or `false` to prevent automatic deletion. **The authenticated user must be an organization owner to set this property to `true`.**',
        default: false,
      },
      use_squash_pr_title_as_default: {
        type: 'boolean',
        description:
          'Either `true` to allow squash-merge commits to use pull request title, or `false` to use commit message. **This property is closing down. Please use `squash_merge_commit_title` instead.',
        default: false,
      },
      squash_merge_commit_title: {
        type: 'string',
        description: 'Required when using `squash_merge_commit_message`.',
        enum: ['PR_TITLE', 'COMMIT_OR_PR_TITLE'],
      },
      squash_merge_commit_message: {
        type: 'string',
        description: 'The default value for a squash merge commit message:',
        enum: ['PR_BODY', 'COMMIT_MESSAGES', 'BLANK'],
      },
      merge_commit_title: {
        type: 'string',
        description: 'Required when using `merge_commit_message`.',
        enum: ['PR_TITLE', 'MERGE_MESSAGE'],
      },
      merge_commit_message: {
        type: 'string',
        description: 'The default value for a merge commit message.',
        enum: ['PR_BODY', 'PR_TITLE', 'BLANK'],
      },
      custom_properties: {
        type: 'object',
        description:
          'The custom properties for the new repository. The keys are the custom property names, and the values are the corresponding custom property values.',
      },
    },
    required: ['org', 'name'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/repos',
    body: [
      'name',
      'description',
      'homepage',
      'private',
      'visibility',
      'has_issues',
      'has_projects',
      'has_wiki',
      'has_downloads',
      'is_template',
      'team_id',
      'auto_init',
      'gitignore_template',
      'license_template',
      'allow_squash_merge',
      'allow_merge_commit',
      'allow_rebase_merge',
      'allow_auto_merge',
      'delete_branch_on_merge',
      'use_squash_pr_title_as_default',
      'squash_merge_commit_title',
      'squash_merge_commit_message',
      'merge_commit_title',
      'merge_commit_message',
      'custom_properties',
    ],
  },
});
