import { defineTool } from '@usemcpkit/core';

export const issuesListForRepo = defineTool({
  name: 'issues:list_for_repo',
  description: 'List repository issues. List issues in a repository. Only open issues will be listed.',
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
      milestone: {
        type: 'string',
        description:
          'If an `integer` is passed, it should refer to a milestone by its `number` field. If the string `*` is passed, issues with any milestone are accepted. If the string `none` is passed, issues without milestones are returned.',
      },
      state: {
        type: 'string',
        default: 'open',
        enum: ['open', 'closed', 'all'],
        description: 'Indicates the state of the issues to return.',
      },
      assignee: {
        type: 'string',
        description:
          'Can be the name of a user. Pass in `none` for issues with no assigned user, and `*` for issues assigned to any user.',
      },
      type: {
        type: 'string',
        description:
          'Can be the name of an issue type. If the string `*` is passed, issues with any type are accepted. If the string `none` is passed, issues without type are returned.',
      },
      creator: {
        type: 'string',
        description: 'The user that created the issue.',
      },
      mentioned: {
        type: 'string',
        description: "A user that's mentioned in the issue.",
      },
      issue_field_values: {
        type: 'string',
        description:
          "A comma-separated list of issue field filters in `field_slug:value` format. Only issues matching all specified field values are returned. Requires issue fields to be enabled for the repository. Issue fields are not available for user-owned repositories, and field availability for organization-owned public repositories depends on the organization's visibility settings. For example, `priority:Urgen…",
      },
      labels: {
        type: 'string',
        description: 'A list of comma separated label names. Example: `bug,ui,@high`',
      },
      sort: {
        type: 'string',
        default: 'created',
        enum: ['created', 'updated', 'comments'],
        description: 'What to sort results by.',
      },
      direction: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'The direction to sort the results by.',
      },
      since: {
        type: 'string',
        description:
          'Only show results that were last updated after the given time. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/issues',
    query: [
      'milestone',
      'state',
      'assignee',
      'type',
      'creator',
      'mentioned',
      'issue_field_values',
      'labels',
      'sort',
      'direction',
      'since',
      'per_page',
      'page',
    ],
  },
});
