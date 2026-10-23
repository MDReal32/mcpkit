import { defineTool } from '@usemcpkit/core';

export const issuesMergeRequestsListProjectsMergeRequests = defineTool({
  name: 'issues:merge_requests:list_projects_merge_requests',
  description: 'List all project merge requests. Lists all project merge requests.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      author_id: {
        type: 'integer',
        description:
          'Returns merge requests created by the given user `id`. Combine with `scope=all` or `scope=assigned_to_me`. Mutually exclusive with `author_username`.',
      },
      author_username: {
        type: 'string',
        description: 'Returns merge requests created by the given `username`. Mutually exclusive with `author_id`.',
      },
      assignee_id: {
        type: 'string',
        description:
          'Returns merge requests assigned to the given user `id`. `None` returns unassigned merge requests. `Any` returns merge requests with an assignee. Mutually exclusive with `assignee_username`.',
      },
      assignee_username: {
        type: 'string',
        description:
          'Returns merge requests created by the given `username`. Mutually exclusive with `assignee_id`. (comma-separated)',
      },
      reviewer_username: {
        type: 'string',
        description:
          'Returns merge requests which have the user as a reviewer with the given `username`. `None` returns merge requests with no reviewers. `Any` returns merge requests with any reviewer. Introduced in GitLab 13.8. Mutually exclusive with `reviewer_id`.',
      },
      labels: {
        type: 'string',
        description:
          'Returns merge requests matching a comma-separated list of labels. `None` lists all merge requests with no labels. `Any` lists all merge requests with at least one label. Predefined names are case-insensitive. (comma-separated)',
      },
      milestone: {
        type: 'string',
        description:
          'Returns merge requests for a specific milestone. `None` returns merge requests with no milestone. `Any` returns merge requests that have an assigned milestone.',
      },
      my_reaction_emoji: {
        type: 'string',
        description:
          'Returns merge requests reacted by the authenticated user by the given `emoji`. `None` returns issues not given a reaction. `Any` returns issues given at least one reaction.',
      },
      reviewer_id: {
        type: 'string',
        description:
          'Returns merge requests which have the user as a reviewer with the given user `id`. `None` returns merge requests with no reviewers. `Any` returns merge requests with any reviewer. Mutually exclusive with `reviewer_username`.',
      },
      state: {
        type: 'string',
        default: 'all',
        enum: ['opened', 'closed', 'locked', 'merged', 'all'],
        description: 'Filter merge requests by state.',
      },
      order_by: {
        type: 'string',
        default: 'created_at',
        enum: [
          'created_at',
          'label_priority',
          'milestone_due',
          'popularity',
          'priority',
          'title',
          'updated_at',
          'merged_at',
        ],
        description:
          'Returns merge requests ordered by `created_at`, `label_priority`, `milestone_due`, `popularity`, `priority`, `title`, `updated_at` or `merged_at` fields. Introduced in GitLab 14.8.',
      },
      sort: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'Sort results in ascending or descending order.',
      },
      with_labels_details: {
        type: 'boolean',
        default: false,
        description:
          'If `true`, the response returns more details for each label in the labels field: `name`, `color`, `description`, `description_html`, `text_color`.',
      },
      with_merge_status_recheck: {
        type: 'boolean',
        default: false,
        description:
          'If `true`, this projection requests (but does not guarantee) an asynchronous recalculation of the `merge_status` field. Enable the `restrict_merge_status_recheck` feature flag to ignore this attribute when requested by users without the Developer, Maintainer, or Owner role.',
      },
      created_after: {
        type: 'string',
        description: 'Return merge requests created on or after the specified time.',
      },
      created_before: {
        type: 'string',
        description: 'Return merge requests created on or before the specified time.',
      },
      updated_after: {
        type: 'string',
        description: 'Return merge requests updated on or after the specified time.',
      },
      updated_before: {
        type: 'string',
        description: 'Return merge requests updated on or before the specified time.',
      },
      merged_after: {
        type: 'string',
        description: 'Return merge requests merged on or after the specified time.',
      },
      merged_before: {
        type: 'string',
        description: 'Return merge requests merged on or before the specified time.',
      },
      view: {
        type: 'string',
        enum: ['simple'],
        description: 'If `simple`, returns the `iid`, URL, title, description, and basic state of merge request.',
      },
      scope: {
        type: 'string',
        enum: ['created-by-me', 'assigned-to-me', 'created_by_me', 'assigned_to_me', 'reviews_for_me', 'all'],
        description:
          'Return merge requests for the given scope. `reviews_for_me` returns merge requests where the current user is assigned as a reviewer.',
      },
      source_branch: {
        type: 'string',
        description: 'Return merge requests with the given source branch.',
      },
      source_project_id: {
        type: 'integer',
        description: 'Return merge requests with the given source project ID.',
      },
      target_branch: {
        type: 'string',
        description: 'Return merge requests with the given target branch.',
      },
      search: {
        type: 'string',
        description: 'Search merge requests against their `title` and `description`. Combine with the `in` attribute.',
      },
      in: {
        type: 'string',
        description:
          'Modify the scope of the `search` attribute to `title`, `description`, or `title,description`. If omitted, defaults to `title,description`.',
      },
      wip: {
        type: 'string',
        enum: ['yes', 'no'],
        description:
          'Filter merge requests by their `wip` status. `yes` returns only draft merge requests, `no` returns non-draft merge requests. Deprecated in GitLab 19.0. Use `draft` instead. Mutually exclusive with `draft`.',
      },
      draft: {
        type: 'boolean',
        description:
          'If `true`, returns only draft merge requests. If `false`, returns only non-draft merge requests. Mutually exclusive with `wip`.',
      },
      not: {
        type: 'object',
        description:
          'Return merge requests that do not match the parameters supplied. Accepts: `labels`, `milestone`, `author_id`, `author_username`, `assignee_id`, `assignee_username`, `reviewer_id`, `reviewer_username`, `my_reaction_emoji`.',
      },
      not_author_id: {
        type: 'integer',
        description:
          '`<Negated>` Returns merge requests created by the given user `id`. Combine with `scope=all` or `scope=assigned_to_me`. Mutually exclusive with `not[author_username]`.',
      },
      not_author_username: {
        type: 'string',
        description:
          '`<Negated>` Returns merge requests created by the given `username`. Mutually exclusive with `not[author_id]`.',
      },
      not_assignee_id: {
        type: 'string',
        description:
          '`<Negated>` Returns merge requests assigned to the given user `id`. `None` returns unassigned merge requests. `Any` returns merge requests with an assignee. Mutually exclusive with `not[assignee_username]`.',
      },
      not_assignee_username: {
        type: 'string',
        description:
          '`<Negated>` Returns merge requests created by the given `username`. Mutually exclusive with `not[assignee_id]`. (comma-separated)',
      },
      not_reviewer_username: {
        type: 'string',
        description:
          '`<Negated>` Returns merge requests which have the user as a reviewer with the given `username`. `None` returns merge requests with no reviewers. `Any` returns merge requests with any reviewer. Introduced in GitLab 13.8. Mutually exclusive with `not[reviewer_id]`.',
      },
      not_labels: {
        type: 'string',
        description:
          '`<Negated>` Returns merge requests matching a comma-separated list of labels. `None` lists all merge requests with no labels. `Any` lists all merge requests with at least one label. Predefined names are case-insensitive. (comma-separated)',
      },
      not_milestone: {
        type: 'string',
        description:
          '`<Negated>` Returns merge requests for a specific milestone. `None` returns merge requests with no milestone. `Any` returns merge requests that have an assigned milestone.',
      },
      not_my_reaction_emoji: {
        type: 'string',
        description:
          '`<Negated>` Returns merge requests reacted by the authenticated user by the given `emoji`. `None` returns issues not given a reaction. `Any` returns issues given at least one reaction.',
      },
      not_reviewer_id: {
        type: 'integer',
        description:
          '`<Negated>` Returns merge requests which have the user as a reviewer with the given user `id`. `None` returns merge requests with no reviewers. `Any` returns merge requests with any reviewer. Mutually exclusive with `not[reviewer_username]`.',
      },
      deployed_before: {
        type: 'string',
        description: 'Return merge requests deployed before the specified time.',
      },
      deployed_after: {
        type: 'string',
        description: 'Return merge requests deployed after the specified time.',
      },
      environment: {
        type: 'string',
        description: 'Return merge requests deployed to the given environment.',
      },
      merge_user_id: {
        type: 'integer',
        description:
          'Returns merge requests which have been merged by the user with the given user `id`. Mutually exclusive with `merge_user_username`.',
      },
      merge_user_username: {
        type: 'string',
        description:
          'Returns merge requests which have been merged by the user with the given `username`. Mutually exclusive with `merge_user_id`.',
      },
      approver_ids: {
        type: 'string',
        description:
          'Return merge requests that have all specified users as eligible approvers according to the approval rules. `None` returns merge requests with no eligible approvers, and `Any` returns merge requests with at least one eligible approver. Premium and Ultimate only.',
      },
      approved_by_ids: {
        type: 'string',
        description:
          'Return merge requests approved by all the users with the given `id`, up to 5 users. `None` returns merge requests with no approvals, and `Any` returns merge requests with an approval. Mutually exclusive with `approved_by_usernames`.',
      },
      approved_by_usernames: {
        type: 'string',
        description:
          'Return merge requests approved by all the users with the given `username`, up to 5 users. `None` returns merge requests with no approvals, and `Any` returns merge requests with an approval. Mutually exclusive with `approved_by_ids`.',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
      iids: {
        type: 'string',
        description: 'Return merge requests matching the provided internal IDs. (comma-separated)',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/merge_requests',
    query: {
      author_id: 'author_id',
      author_username: 'author_username',
      assignee_id: 'assignee_id',
      assignee_username: 'assignee_username',
      reviewer_username: 'reviewer_username',
      labels: 'labels',
      milestone: 'milestone',
      my_reaction_emoji: 'my_reaction_emoji',
      reviewer_id: 'reviewer_id',
      state: 'state',
      order_by: 'order_by',
      sort: 'sort',
      with_labels_details: 'with_labels_details',
      with_merge_status_recheck: 'with_merge_status_recheck',
      created_after: 'created_after',
      created_before: 'created_before',
      updated_after: 'updated_after',
      updated_before: 'updated_before',
      merged_after: 'merged_after',
      merged_before: 'merged_before',
      view: 'view',
      scope: 'scope',
      source_branch: 'source_branch',
      source_project_id: 'source_project_id',
      target_branch: 'target_branch',
      search: 'search',
      in: 'in',
      wip: 'wip',
      draft: 'draft',
      not: 'not',
      'not[author_id]': 'not_author_id',
      'not[author_username]': 'not_author_username',
      'not[assignee_id]': 'not_assignee_id',
      'not[assignee_username]': 'not_assignee_username',
      'not[reviewer_username]': 'not_reviewer_username',
      'not[labels]': 'not_labels',
      'not[milestone]': 'not_milestone',
      'not[my_reaction_emoji]': 'not_my_reaction_emoji',
      'not[reviewer_id]': 'not_reviewer_id',
      deployed_before: 'deployed_before',
      deployed_after: 'deployed_after',
      environment: 'environment',
      merge_user_id: 'merge_user_id',
      merge_user_username: 'merge_user_username',
      approver_ids: 'approver_ids',
      approved_by_ids: 'approved_by_ids',
      approved_by_usernames: 'approved_by_usernames',
      page: 'page',
      per_page: 'per_page',
      iids: 'iids',
    },
  },
});
