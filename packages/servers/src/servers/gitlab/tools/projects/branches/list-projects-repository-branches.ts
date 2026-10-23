import { defineTool } from '@usemcpkit/core';

export const projectsBranchesListProjectsRepositoryBranches = defineTool({
  name: 'projects:branches:list_projects_repository_branches',
  description:
    'List all repository branches. Lists all repository branches from a specified project, sorted alphabetically by name. Search by name, or use regular expressions to find specific branch patterns. Returns detailed information about the branch, including its protection status, merge status, and commit details.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
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
      search: {
        type: 'string',
        description:
          'Return branches containing the search string. Use `^term` to find branches that begin with `term`, and `term$` to find branches that end with `term`.',
      },
      regex: {
        type: 'string',
        description:
          'Return branches with names matching an RE2 regular expression. Cannot be used together with `search`.',
      },
      sort: {
        type: 'string',
        enum: ['name_asc', 'updated_asc', 'updated_desc'],
        description: 'Sort results by the specified field and direction.',
      },
      page_token: {
        type: 'string',
        description: 'Name of the branch to start the pagination from. Used for keyset pagination.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/repository/branches',
    query: ['page', 'per_page', 'search', 'regex', 'sort', 'page_token'],
  },
});
