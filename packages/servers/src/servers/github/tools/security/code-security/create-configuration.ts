import { defineTool } from '@usemcpkit/core';

export const securityCodeSecurityCreateConfiguration = defineTool({
  name: 'security:code_security:create_configuration',
  description: 'Create a code security configuration. Creates a code security configuration in an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
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
        default: 'disabled',
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
        default: 'enabled',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      dependency_graph_autosubmit_action: {
        type: 'string',
        description: 'The enablement status of Automatic dependency submission',
        default: 'disabled',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      dependency_graph_autosubmit_action_options: {
        type: 'object',
        description: 'Feature options for Automatic dependency submission',
        properties: {
          labeled_runners: {
            type: 'boolean',
            description: "Whether to use runners labeled with 'dependency-submission' or standard GitHub runners.",
            default: false,
          },
        },
      },
      dependabot_alerts: {
        type: 'string',
        description: 'The enablement status of Dependabot alerts',
        default: 'disabled',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      dependabot_security_updates: {
        type: 'string',
        description: 'The enablement status of Dependabot security updates',
        default: 'disabled',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      dependabot_delegated_alert_dismissal: {
        type: 'string',
        description:
          'The enablement status of Dependabot delegated alert dismissal. Requires Dependabot alerts to be enabled.',
        default: 'disabled',
        enum: ['enabled', 'disabled', 'not_set'],
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
      code_scanning_default_setup: {
        type: 'string',
        description: 'The enablement status of code scanning default setup',
        default: 'disabled',
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
      code_scanning_delegated_alert_dismissal: {
        type: 'string',
        description: 'The enablement status of code scanning delegated alert dismissal',
        default: 'not_set',
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
        default: 'disabled',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      secret_scanning_push_protection: {
        type: 'string',
        description: 'The enablement status of secret scanning push protection',
        default: 'disabled',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      secret_scanning_delegated_bypass: {
        type: 'string',
        description: 'The enablement status of secret scanning delegated bypass',
        default: 'disabled',
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
        default: 'disabled',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      secret_scanning_non_provider_patterns: {
        type: 'string',
        description: 'The enablement status of secret scanning non provider patterns',
        default: 'disabled',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      secret_scanning_generic_secrets: {
        type: 'string',
        description: 'The enablement status of Copilot secret scanning',
        default: 'disabled',
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
        default: 'disabled',
        enum: ['enabled', 'disabled', 'not_set'],
      },
      enforcement: {
        type: 'string',
        description: 'The enforcement status for a security configuration',
        default: 'enforced',
        enum: ['enforced', 'unenforced'],
      },
    },
    required: ['org', 'name'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/code-security/configurations',
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
      'code_scanning_options',
      'code_scanning_default_setup',
      'code_scanning_default_setup_options',
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
