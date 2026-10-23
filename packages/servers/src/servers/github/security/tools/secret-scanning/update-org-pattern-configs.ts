import { defineTool } from '@usemcpkit/core';

export const secretScanningUpdateOrgPatternConfigs = defineTool({
  name: 'secret_scanning:update_org_pattern_configs',
  description:
    'Update organization pattern configurations. Updates the secret scanning pattern configurations for an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      pattern_config_version: {
        type: 'string',
        description:
          "The version of the entity. This is used to confirm you're updating the current version of the entity and mitigate unintentionally overriding someone else's update.",
      },
      provider_pattern_settings: {
        type: 'array',
        description: 'Pattern settings for provider patterns.',
        items: {
          type: 'object',
          properties: {
            token_type: {
              type: 'string',
              description: 'The ID of the pattern to configure.',
            },
            push_protection_setting: {
              type: 'string',
              description: 'Push protection setting to set for the pattern.',
              enum: ['not-set', 'disabled', 'enabled'],
            },
          },
        },
      },
      custom_pattern_settings: {
        type: 'array',
        description: 'Pattern settings for custom patterns.',
        items: {
          type: 'object',
          properties: {
            token_type: {
              type: 'string',
              description: 'The ID of the pattern to configure.',
            },
            custom_pattern_version: {
              type: 'string',
              description:
                "The version of the entity. This is used to confirm you're updating the current version of the entity and mitigate unintentionally overriding someone else's update.",
            },
            push_protection_setting: {
              type: 'string',
              description: 'Push protection setting to set for the pattern.',
              enum: ['disabled', 'enabled'],
            },
          },
        },
      },
    },
    required: ['org'],
  },
  request: {
    method: 'PATCH',
    path: '/orgs/{org}/secret-scanning/pattern-configurations',
    body: ['pattern_config_version', 'provider_pattern_settings', 'custom_pattern_settings'],
  },
});
