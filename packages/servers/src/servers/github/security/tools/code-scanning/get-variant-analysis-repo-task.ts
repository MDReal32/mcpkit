import { defineTool } from '@usemcpkit/core';

export const codeScanningGetVariantAnalysisRepoTask = defineTool({
  name: 'code_scanning:get_variant_analysis_repo_task',
  description:
    'Get the analysis status of a repository in a CodeQL variant analysis. Gets the analysis status of a repository in a CodeQL variant analysis.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the controller repository.',
      },
      codeql_variant_analysis_id: {
        type: 'integer',
        description: 'The ID of the variant analysis.',
      },
      repo_owner: {
        type: 'string',
        description: 'The account owner of the variant analysis repository. The name is not case sensitive.',
      },
      repo_name: {
        type: 'string',
        description: 'The name of the variant analysis repository.',
      },
    },
    required: ['owner', 'repo', 'codeql_variant_analysis_id', 'repo_owner', 'repo_name'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/code-scanning/codeql/variant-analyses/{codeql_variant_analysis_id}/repos/{repo_owner}/{repo_name}',
  },
});
