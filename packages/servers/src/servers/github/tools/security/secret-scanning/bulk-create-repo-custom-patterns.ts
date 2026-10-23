import { defineTool } from '@usemcpkit/core';

export const securitySecretScanningBulkCreateRepoCustomPatterns = defineTool({
  name: 'security:secret_scanning:bulk_create_repo_custom_patterns',
  description: 'Bulk create repository custom patterns. Bulk creates secret scanning custom patterns for a repository.',
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
      patterns: {
        type: 'array',
        description: 'The list of custom patterns to create (maximum 100).',
        items: {
          type: 'object',
          description: 'A custom pattern to create in a bulk operation.',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the custom pattern.',
            },
            pattern: {
              type: 'string',
              description: 'The regular expression of the custom pattern.',
            },
            start_delimiter: {
              type: 'string',
              description:
                'The start delimiter regex for the custom pattern. Defaults to `\\A|[^0-9A-Za-z]` when not specified.',
              default: '\\A|[^0-9A-Za-z]',
            },
            end_delimiter: {
              type: 'string',
              description:
                'The end delimiter regex for the custom pattern. Defaults to `\\z|[^0-9A-Za-z]` when not specified.',
              default: '\\z|[^0-9A-Za-z]',
            },
            must_match: {
              type: 'array',
              description: 'List of regexes that the secret must match.',
              items: {
                type: 'string',
              },
            },
            must_not_match: {
              type: 'array',
              description: 'List of regexes that the secret must not match.',
              items: {
                type: 'string',
              },
            },
          },
          required: ['name', 'pattern'],
        },
      },
    },
    required: ['owner', 'repo', 'patterns'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/secret-scanning/custom-patterns',
    body: ['patterns'],
  },
});
