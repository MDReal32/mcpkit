import { defineTool } from '@usemcpkit/core';

export const copilotCopilotSetEnterpriseCodingAgentPolicy = defineTool({
  name: 'copilot:copilot:set_enterprise_coding_agent_policy',
  description:
    'Set the coding agent policy for an enterprise. Sets the policy for Copilot cloud agent usage across an enterprise.',
  input: {
    type: 'object',
    properties: {
      enterprise: {
        type: 'string',
        description: 'The slug version of the enterprise name.',
      },
      policy_state: {
        type: 'string',
        description:
          'The policy state for Copilot cloud agent in the enterprise. Can be one of `enabled_for_all_orgs`, `disabled_for_all_orgs`, `enabled_for_selected_orgs`, or `configured_by_org_admins`.',
        enum: [
          'enabled_for_all_orgs',
          'disabled_for_all_orgs',
          'enabled_for_selected_orgs',
          'configured_by_org_admins',
        ],
      },
    },
    required: ['enterprise', 'policy_state'],
  },
  request: {
    method: 'PUT',
    path: '/enterprises/{enterprise}/copilot/policies/coding_agent',
    body: ['policy_state'],
  },
});
