import { defineTool } from '@usemcpkit/core';

export const securitySecretScanningUpdateOrgCustomPattern = defineTool({
  name: 'security:secret_scanning:update_org_custom_pattern',
  description: 'Update an organization custom pattern. Updates a secret scanning custom pattern for an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      pattern_id: {
        type: 'integer',
        description: 'The ID of the custom pattern.',
      },
      pattern: {
        type: 'string',
        description: 'The updated regular expression of the custom pattern.',
      },
      start_delimiter: {
        type: 'string',
        description: 'The updated start delimiter regex for the custom pattern.',
      },
      end_delimiter: {
        type: 'string',
        description: 'The updated end delimiter regex for the custom pattern.',
      },
      must_match: {
        type: 'array',
        description: 'Updated list of regexes that the secret must match.',
        items: {
          type: 'string',
        },
      },
      must_not_match: {
        type: 'array',
        description: 'Updated list of regexes that the secret must not match.',
        items: {
          type: 'string',
        },
      },
      custom_pattern_version: {
        type: 'string',
        description:
          "The version of the entity. This is used to confirm you're updating the current version of the entity and mitigate unintentionally overriding someone else's update.",
      },
    },
    required: ['org', 'pattern_id', 'custom_pattern_version'],
  },
  request: {
    method: 'PATCH',
    path: '/orgs/{org}/secret-scanning/custom-patterns/{pattern_id}',
    body: ['pattern', 'start_delimiter', 'end_delimiter', 'must_match', 'must_not_match', 'custom_pattern_version'],
  },
});
