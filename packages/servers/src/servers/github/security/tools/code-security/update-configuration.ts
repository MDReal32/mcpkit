import { defineTool } from '@usemcpkit/core';

export const codeSecurityUpdateConfiguration = defineTool({
  name: 'code_security:update_configuration',
  description: 'Update a code security configuration. Updates a code security configuration in an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      configuration_id: {
        type: 'integer',
        description: 'The unique identifier of the code security configuration.',
      },
      name: {
        type: 'string',
        description: 'The name of the code security configuration. Must be unique within the organization.',
      },
      description: {
        type: 'string',
        description: 'A description of the code security configuration',
      },
      advanced_security: {
        type: 'string',
        description:
          'The enablement status of GitHub Advanced Security features. `enabled` will enable both Code Security and Secret Protection features.',
        enum: ['enabled', 'disabled', 'code_security', 'secret_protection'],
      },
      code_security: {
        type: 'string',
        description: 'The enablement status of GitHub Code Security features.',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      dependency_graph: {
        type: 'string',
        description: 'The enablement status of Dependency Graph',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      dependency_graph_autosubmit_action: {
        type: 'string',
        description: 'The enablement status of Automatic dependency submission',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      dependency_graph_autosubmit_action_options: {
        type: 'object',
        description: 'Feature options for Automatic dependency submission',
        properties: {
          labeled_runners: {
            type: 'boolean',
            description: "Whether to use runners labeled with 'dependency-submission' or standard GitHub runners.",
          },
        },
      },
      dependabot_alerts: {
        type: 'string',
        description: 'The enablement status of Dependabot alerts',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      dependabot_security_updates: {
        type: 'string',
        description: 'The enablement status of Dependabot security updates',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      dependabot_delegated_alert_dismissal: {
        type: 'string',
        description:
          'The enablement status of Dependabot delegated alert dismissal. Requires Dependabot alerts to be enabled.',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      code_scanning_default_setup: {
        type: 'string',
        description: 'The enablement status of code scanning default setup',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      code_scanning_default_setup_options: {
        type: 'object',
        description: 'Feature options for code scanning default setup',
        properties: {
          runner_type: {
            type: 'string',
            description: 'Whether to use labeled runners or standard GitHub runners.',
            enum: ['standard', 'labeled', 'not_set'],
          },
          runner_label: {
            type: 'string',
            description:
              "The label of the runner to use for code scanning default setup when runner_type is 'labeled'.",
          },
        },
      },
      code_scanning_options: {
        type: 'object',
        description: 'Security Configuration feature options for code scanning',
        properties: {
          allow_advanced: {
            type: 'boolean',
            description: 'Whether to allow repos which use advanced setup',
          },
        },
      },
      code_scanning_delegated_alert_dismissal: {
        type: 'string',
        description: 'The enablement status of code scanning delegated alert dismissal',
        default: 'disabled',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      secret_protection: {
        type: 'string',
        description: 'The enablement status of GitHub Secret Protection features.',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      secret_scanning: {
        type: 'string',
        description: 'The enablement status of secret scanning',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      secret_scanning_push_protection: {
        type: 'string',
        description: 'The enablement status of secret scanning push protection',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      secret_scanning_delegated_bypass: {
        type: 'string',
        description: 'The enablement status of secret scanning delegated bypass',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      secret_scanning_delegated_bypass_options: {
        type: 'object',
        description: 'Feature options for secret scanning delegated bypass',
        properties: {
          reviewers: {
            type: 'array',
            description: 'The bypass reviewers for secret scanning delegated bypass',
            items: {
              type: 'object',
            },
          },
        },
      },
      secret_scanning_validity_checks: {
        type: 'string',
        description: 'The enablement status of secret scanning validity checks',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      secret_scanning_non_provider_patterns: {
        type: 'string',
        description: 'The enablement status of secret scanning non-provider patterns',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      secret_scanning_generic_secrets: {
        type: 'string',
        description: 'The enablement status of Copilot secret scanning',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      secret_scanning_delegated_alert_dismissal: {
        type: 'string',
        description: 'The enablement status of secret scanning delegated alert dismissal',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      secret_scanning_extended_metadata: {
        type: 'string',
        description: 'The enablement status of secret scanning extended metadata',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      private_vulnerability_reporting: {
        type: 'string',
        description: 'The enablement status of private vulnerability reporting',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      enforcement: {
        type: 'string',
        description: 'The enforcement status for a security configuration',
        enum: ['enforced', 'unenforced'],
      },
    },
    required: ['org', 'configuration_id'],
  },
  request: {
    method: 'PATCH',
    path: '/orgs/{org}/code-security/configurations/{configuration_id}',
    body: [
      'name',
      'description',
      'advanced_security',
      'code_security',
      'dependency_graph',
      'dependency_graph_autosubmit_action',
      'dependency_graph_autosubmit_action_options',
      'dependabot_alerts',
      'dependabot_security_updates',
      'dependabot_delegated_alert_dismissal',
      'code_scanning_default_setup',
      'code_scanning_default_setup_options',
      'code_scanning_options',
      'code_scanning_delegated_alert_dismissal',
      'secret_protection',
      'secret_scanning',
      'secret_scanning_push_protection',
      'secret_scanning_delegated_bypass',
      'secret_scanning_delegated_bypass_options',
      'secret_scanning_validity_checks',
      'secret_scanning_non_provider_patterns',
      'secret_scanning_generic_secrets',
      'secret_scanning_delegated_alert_dismissal',
      'secret_scanning_extended_metadata',
      'private_vulnerability_reporting',
      'enforcement',
    ],
  },
});
