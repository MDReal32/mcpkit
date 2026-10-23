import { defineTool } from '@usemcpkit/core';

export const projectsRepositoriesListProjectsRepositoryTree = defineTool({
  name: 'projects:repositories:list_projects_repository_tree',
  description:
    'List all repository trees in a project. Lists all repository files and directories in a specified project. This endpoint can be accessed without authentication if the repository is publicly accessible. This command provides essentially the same features as the `git ls-tree` command. Use `with_last_commit` to include the last commit that changed each entry. `with_last_commit` cannot be combined with `recursive`.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      ref: {
        type: 'string',
        description: 'Name of a repository branch or tag. If omitted, uses the default branch.',
      },
      path: {
        type: 'string',
        description: 'Path inside the repository, used to get the contents of subdirectories.',
      },
      recursive: {
        type: 'boolean',
        default: false,
        description: 'If `true`, returns a recursive tree.',
      },
      with_last_commit: {
        type: 'boolean',
        default: false,
        description:
          'If `true`, includes the last commit for each tree entry. Cannot be combined with `recursive`. Introduced in GitLab 19.3.',
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
      pagination: {
        type: 'string',
        default: 'legacy',
        enum: ['legacy', 'keyset', 'none'],
        description:
          'Pagination method. `keyset` uses the keyset-based pagination method. `none` is valid only if `recursive` is `true`.',
      },
      page_token: {
        type: 'string',
        description: 'Tree record ID at which to fetch the next page. Used only with keyset pagination.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/repository/tree',
    query: ['ref', 'path', 'recursive', 'with_last_commit', 'page', 'per_page', 'pagination', 'page_token'],
  },
});
