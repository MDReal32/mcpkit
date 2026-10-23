import { defineTool } from '@usemcpkit/core';

export const codeScanningGetVariantAnalysis = defineTool({
  name: 'code_scanning:get_variant_analysis',
  description: 'Get the summary of a CodeQL variant analysis. Gets the summary of a CodeQL variant analysis.',
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
      codeql_variant_analysis_id: {
        type: 'integer',
        description: 'The unique identifier of the variant analysis.',
      },
    },
    required: ['owner', 'repo', 'codeql_variant_analysis_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/code-scanning/codeql/variant-analyses/{codeql_variant_analysis_id}',
  },
});
