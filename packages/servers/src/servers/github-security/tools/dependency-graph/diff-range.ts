import { defineTool } from '@usemcpkit/core';

export const dependencyGraphDiffRange = defineTool({
  name: 'dependency_graph:diff_range',
  description:
    'Get a diff of the dependencies between commits. Gets the diff of the dependency changes between two commits of a repository, based on the changes to the dependency manifests made in those commits.',
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
      basehead: {
        type: 'string',
        description:
          'The base and head Git revisions to compare. The Git revisions will be resolved to commit SHAs. Named revisions will be resolved to their corresponding HEAD commits, and an appropriate merge base will be determined. This parameter expects the format `{base}...{head}`.',
      },
      name: {
        type: 'string',
        description: 'The full path, relative to the repository root, of the dependency manifest file.',
      },
    },
    required: ['owner', 'repo', 'basehead'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/dependency-graph/compare/{basehead}',
    query: ['name'],
  },
});
