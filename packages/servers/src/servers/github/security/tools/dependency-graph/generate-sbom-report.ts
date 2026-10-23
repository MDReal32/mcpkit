import { defineTool } from '@usemcpkit/core';

export const dependencyGraphGenerateSbomReport = defineTool({
  name: 'dependency_graph:generate_sbom_report',
  description:
    'Request generation of a software bill of materials (SBOM) for a repository. Triggers a job to generate a software bill of materials (SBOM) for a repository in SPDX JSON format.',
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
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/dependency-graph/sbom/generate-report',
  },
});
