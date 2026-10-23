import { defineTool } from '@usemcpkit/core';

export const codeScanningListAlertsForRepo = defineTool({
  name: 'code_scanning:list_alerts_for_repo',
  description: 'List code scanning alerts for a repository. Lists code scanning alerts.',
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
      tool_name: {
        type: 'string',
        description:
          'The name of a code scanning tool. Only results by this tool will be listed. You can specify the tool by using either `tool_name` or `tool_guid`, but not both.',
      },
      tool_guid: {
        type: 'string',
        description:
          'The GUID of a code scanning tool. Only results by this tool will be listed. Note that some code scanning tools may not include a GUID in their analysis data. You can specify the tool by using either `tool_guid` or `tool_name`, but not both.',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      ref: {
        type: 'string',
        description:
          'The Git reference for the results you want to list. The `ref` for a branch can be formatted either as `refs/heads/<branch name>` or simply `<branch name>`. To reference a pull request use `refs/pull/<number>/merge`.',
      },
      pr: {
        type: 'integer',
        description: 'The number of the pull request for the results you want to list.',
      },
      direction: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'The direction to sort the results by.',
      },
      before: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results before this cursor. For more information, see "Using pagination in the REST API."',
      },
      after: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results after this cursor. For more information, see "Using pagination in the REST API."',
      },
      sort: {
        type: 'string',
        default: 'created',
        enum: ['created', 'updated'],
        description: 'The property by which to sort the results.',
      },
      state: {
        type: 'string',
        description: 'If specified, only code scanning alerts with this state will be returned.',
        enum: ['open', 'closed', 'dismissed', 'fixed'],
      },
      severity: {
        type: 'string',
        description: 'If specified, only code scanning alerts with this severity will be returned.',
        enum: ['critical', 'high', 'medium', 'low', 'warning', 'note', 'error'],
      },
      assignees: {
        type: 'string',
        description:
          'Filter alerts by assignees. Provide a comma-separated list of user handles (e.g., `octocat` or `octocat,hubot`). Use `*` to list alerts with at least one assignee or `none` to list alerts with no assignees.',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/code-scanning/alerts',
    query: [
      'tool_name',
      'tool_guid',
      'page',
      'per_page',
      'ref',
      'pr',
      'direction',
      'before',
      'after',
      'sort',
      'state',
      'severity',
      'assignees',
    ],
  },
});
