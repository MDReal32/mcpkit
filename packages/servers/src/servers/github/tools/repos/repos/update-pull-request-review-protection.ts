import { defineTool } from '@usemcpkit/core';

export const reposReposUpdatePullRequestReviewProtection = defineTool({
  name: 'repos:repos:update_pull_request_review_protection',
  description:
    "Update pull request review protection. Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see GitHub's products in the GitHub Help documentation.",
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
      branch: {
        type: 'string',
        description:
          'The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use the GraphQL API.',
      },
      dismissal_restrictions: {
        type: 'object',
        description:
          'Specify which users, teams, and apps can dismiss pull request reviews. Pass an empty `dismissal_restrictions` object to disable. User and team `dismissal_restrictions` are only available for organization-owned repositories. Omit this parameter for personal repositories.',
        properties: {
          users: {
            type: 'array',
            description: 'The list of user `login`s with dismissal access',
            items: {
              type: 'string',
            },
          },
          teams: {
            type: 'array',
            description: 'The list of team `slug`s with dismissal access',
            items: {
              type: 'string',
            },
          },
          apps: {
            type: 'array',
            description: 'The list of app `slug`s with dismissal access',
            items: {
              type: 'string',
            },
          },
        },
      },
      dismiss_stale_reviews: {
        type: 'boolean',
        description:
          'Set to `true` if you want to automatically dismiss approving reviews when someone pushes a new commit.',
      },
      require_code_owner_reviews: {
        type: 'boolean',
        description: 'Blocks merging pull requests until code owners have reviewed.',
      },
      required_approving_review_count: {
        type: 'integer',
        description:
          'Specifies the number of reviewers required to approve pull requests. Use a number between 1 and 6 or 0 to not require reviewers.',
      },
      require_last_push_approval: {
        type: 'boolean',
        description:
          'Whether the most recent push must be approved by someone other than the person who pushed it. Default: `false`',
        default: false,
      },
      bypass_pull_request_allowances: {
        type: 'object',
        description: 'Allow specific users, teams, or apps to bypass pull request requirements.',
        properties: {
          users: {
            type: 'array',
            description: 'The list of user `login`s allowed to bypass pull request requirements.',
            items: {
              type: 'string',
            },
          },
          teams: {
            type: 'array',
            description: 'The list of team `slug`s allowed to bypass pull request requirements.',
            items: {
              type: 'string',
            },
          },
          apps: {
            type: 'array',
            description: 'The list of app `slug`s allowed to bypass pull request requirements.',
            items: {
              type: 'string',
            },
          },
        },
      },
    },
    required: ['owner', 'repo', 'branch'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews',
    body: [
      'dismissal_restrictions',
      'dismiss_stale_reviews',
      'require_code_owner_reviews',
      'required_approving_review_count',
      'require_last_push_approval',
      'bypass_pull_request_allowances',
    ],
  },
});
