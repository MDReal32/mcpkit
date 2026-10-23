import { defineTool } from '@usemcpkit/core';

export const securityCodeScanningCreateVariantAnalysis = defineTool({
  name: 'security:code_scanning:create_variant_analysis',
  description:
    'Create a CodeQL variant analysis. Creates a new CodeQL variant analysis, which will run a CodeQL query against one or more repositories.',
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
      language: {
        type: 'string',
        description: 'The language targeted by the CodeQL query',
        enum: ['actions', 'cpp', 'csharp', 'go', 'java', 'javascript', 'python', 'ruby', 'rust', 'swift'],
      },
      query_pack: {
        type: 'string',
        description: 'A Base64-encoded tarball containing a CodeQL query and all its dependencies',
      },
      repositories: {
        type: 'array',
        description:
          'List of repository names (in the form `owner/repo-name`) to run the query against. Precisely one property from `repositories`, `repository_lists` and `repository_owners` is required.',
        items: {
          type: 'string',
        },
      },
      repository_lists: {
        type: 'array',
        description:
          'List of repository lists to run the query against. Precisely one property from `repositories`, `repository_lists` and `repository_owners` is required.',
        items: {
          type: 'string',
        },
      },
      repository_owners: {
        type: 'array',
        description:
          'List of organization or user names whose repositories the query should be run against. Precisely one property from `repositories`, `repository_lists` and `repository_owners` is required.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['owner', 'repo', 'language', 'query_pack'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/code-scanning/codeql/variant-analyses',
    body: ['language', 'query_pack', 'repositories', 'repository_lists', 'repository_owners'],
  },
});
