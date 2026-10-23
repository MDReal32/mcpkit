import { defineTool } from '@usemcpkit/core';

export const reposReposUpdate = defineTool({
  name: 'repos:repos:update',
  description:
    "Update a repository. **Note**: To edit a repository's topics, use the Replace all repository topics endpoint.",
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
        description:
          'Either `true` to make the repository private or `false` to make it public. Default: `false`. **Note**: You will get a `422` error if the organization restricts changing repository visibility to organization owners and a non-owner tries to change the value of private.',
        default: false,
      },
      visibility: {
        type: 'string',
        description: 'The visibility of the repository.',
        enum: ['public', 'private'],
      },
      security_and_analysis: {
        type: 'object',
        description: 'Specify which security and analysis features to enable or disable for the repository.',
        properties: {
          advanced_security: {
            type: 'object',
            description:
              'Use the `status` property to enable or disable GitHub Advanced Security for this repository. For more information, see "About GitHub Advanced Security."',
            properties: {
              status: {
                type: 'string',
                description: 'Can be `enabled` or `disabled`.',
              },
            },
          },
          code_security: {
            type: 'object',
            description: 'Use the `status` property to enable or disable GitHub Code Security for this repository.',
            properties: {
              status: {
                type: 'string',
                description: 'Can be `enabled` or `disabled`.',
              },
            },
          },
          secret_scanning: {
            type: 'object',
            description:
              'Use the `status` property to enable or disable secret scanning for this repository. For more information, see "About secret scanning."',
            properties: {
              status: {
                type: 'string',
                description: 'Can be `enabled` or `disabled`.',
              },
            },
          },
          secret_scanning_push_protection: {
            type: 'object',
            description:
              'Use the `status` property to enable or disable secret scanning push protection for this repository. For more information, see "Protecting pushes with secret scanning."',
            properties: {
              status: {
                type: 'string',
                description: 'Can be `enabled` or `disabled`.',
              },
            },
          },
          secret_scanning_ai_detection: {
            type: 'object',
            description:
              'Use the `status` property to enable or disable secret scanning AI detection for this repository. For more information, see "Responsible detection of generic secrets with AI."',
            properties: {
              status: {
                type: 'string',
                description: 'Can be `enabled` or `disabled`.',
              },
            },
          },
          secret_scanning_non_provider_patterns: {
            type: 'object',
            description:
              'Use the `status` property to enable or disable secret scanning non-provider patterns for this repository. For more information, see "Supported secret scanning patterns."',
            properties: {
              status: {
                type: 'string',
                description: 'Can be `enabled` or `disabled`.',
              },
            },
          },
          secret_scanning_delegated_alert_dismissal: {
            type: 'object',
            description:
              'Use the `status` property to enable or disable secret scanning delegated alert dismissal for this repository.',
            properties: {
              status: {
                type: 'string',
                description: 'Can be `enabled` or `disabled`.',
              },
            },
          },
          secret_scanning_delegated_bypass: {
            type: 'object',
            description:
              'Use the `status` property to enable or disable secret scanning delegated bypass for this repository.',
            properties: {
              status: {
                type: 'string',
                description: 'Can be `enabled` or `disabled`.',
              },
            },
          },
          secret_scanning_delegated_bypass_options: {
            type: 'object',
            description:
              'Feature options for secret scanning delegated bypass. This object is only honored when `security_and_analysis.secret_scanning_delegated_bypass.status` is set to `enabled`. You can send this object in the same request as `secret_scanning_delegated_bypass`, or update just the options in a separate request.',
            properties: {
              reviewers: {
                type: 'array',
                description:
                  'The bypass reviewers for secret scanning delegated bypass. If you omit this field, the existing set of reviewers is unchanged.',
                items: {
                  type: 'object',
                },
              },
            },
          },
        },
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
      has_pull_requests: {
        type: 'boolean',
        description: 'Either `true` to allow pull requests for this repository or `false` to prevent pull requests.',
        default: true,
      },
      pull_request_creation_policy: {
        type: 'string',
        description:
          'The policy that controls who can create pull requests for this repository: `all` or `collaborators_only`.',
        enum: ['all', 'collaborators_only'],
      },
      is_template: {
        type: 'boolean',
        description: 'Either `true` to make this repo available as a template repository or `false` to prevent it.',
        default: false,
      },
      default_branch: {
        type: 'string',
        description: 'Updates the default branch for this repository.',
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
          'Either `true` to allow automatically deleting head branches when pull requests are merged, or `false` to prevent automatic deletion.',
        default: false,
      },
      allow_update_branch: {
        type: 'boolean',
        description:
          'Either `true` to always allow a pull request head branch that is behind its base branch to be updated even if it is not required to be up to date before merging, or false otherwise.',
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
      archived: {
        type: 'boolean',
        description: 'Whether to archive this repository. `false` will unarchive a previously archived repository.',
        default: false,
      },
      allow_forking: {
        type: 'boolean',
        description: 'Either `true` to allow private forks, or `false` to prevent private forks.',
        default: false,
      },
      web_commit_signoff_required: {
        type: 'boolean',
        description:
          'Either `true` to require contributors to sign off on web-based commits, or `false` to not require contributors to sign off on web-based commits.',
        default: false,
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}',
    body: [
      'name',
      'description',
      'homepage',
      'private',
      'visibility',
      'security_and_analysis',
      'has_issues',
      'has_projects',
      'has_wiki',
      'has_pull_requests',
      'pull_request_creation_policy',
      'is_template',
      'default_branch',
      'allow_squash_merge',
      'allow_merge_commit',
      'allow_rebase_merge',
      'allow_auto_merge',
      'delete_branch_on_merge',
      'allow_update_branch',
      'use_squash_pr_title_as_default',
      'squash_merge_commit_title',
      'squash_merge_commit_message',
      'merge_commit_title',
      'merge_commit_message',
      'archived',
      'allow_forking',
      'web_commit_signoff_required',
    ],
  },
});
