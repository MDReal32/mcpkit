import { defineTool } from '@usemcpkit/core';

export const projectsRepositoriesGetProjectsRepositoryCompare = defineTool({
  name: 'projects:repositories:get_projects_repository_compare',
  description:
    'Compare branches, tags, or commits. Compares branches, tags, or commits. Retrieves the differences between two branches, tags, or commits in a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      from: {
        type: 'string',
        description: 'Ref to compare from. Accepts a commit SHA, branch name, or tag name.',
      },
      to: {
        type: 'string',
        description: 'Ref to compare to. Accepts a commit SHA, branch name, or tag name.',
      },
      from_project_id: {
        type: 'integer',
        description: 'ID of the project to compare from.',
      },
      straight: {
        type: 'boolean',
        default: false,
        description:
          'If `true`, comparison method is direct comparison between `from` and `to` (`from`..`to`). If `false`, compares using merge base (`from`...`to`).',
      },
      unidiff: {
        type: 'boolean',
        default: false,
        description: 'If `true`, presents diffs in the unified diff format.',
      },
    },
    required: ['id', 'from', 'to'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/repository/compare',
    query: ['from', 'to', 'from_project_id', 'straight', 'unidiff'],
  },
});
