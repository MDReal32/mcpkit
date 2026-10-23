import { defineTool } from '@usemcpkit/core';

export const secretScanningBulkCreateOrgCustomPatterns = defineTool({
  name: 'secret_scanning:bulk_create_org_custom_patterns',
  description:
    'Bulk create organization custom patterns. Bulk creates secret scanning custom patterns for an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
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
    required: ['org', 'patterns'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/secret-scanning/custom-patterns',
    body: ['patterns'],
  },
});
