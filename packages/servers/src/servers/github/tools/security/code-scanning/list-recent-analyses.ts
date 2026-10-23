import { defineTool } from '@usemcpkit/core';

export const securityCodeScanningListRecentAnalyses = defineTool({
  name: 'security:code_scanning:list_recent_analyses',
  description:
    "List code scanning analyses for a repository. Lists the details of all code scanning analyses for a repository, starting with the most recent. The response is paginated and you can use the `page` and `per_page` parameters to list the analyses you're interested in. By default 30 analyses are listed per page.",
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
      pr: {
        type: 'integer',
        description: 'The number of the pull request for the results you want to list.',
      },
      ref: {
        type: 'string',
        description:
          'The Git reference for the analyses you want to list. The `ref` for a branch can be formatted either as `refs/heads/<branch name>` or simply `<branch name>`. To reference a pull request use `refs/pull/<number>/merge`.',
      },
      sarif_id: {
        type: 'string',
        description: 'Filter analyses belonging to the same SARIF upload.',
      },
      direction: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'The direction to sort the results by.',
      },
      sort: {
        type: 'string',
        default: 'created',
        enum: ['created'],
        description: 'The property by which to sort the results.',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/code-scanning/analyses',
    query: ['tool_name', 'tool_guid', 'page', 'per_page', 'pr', 'ref', 'sarif_id', 'direction', 'sort'],
  },
});
