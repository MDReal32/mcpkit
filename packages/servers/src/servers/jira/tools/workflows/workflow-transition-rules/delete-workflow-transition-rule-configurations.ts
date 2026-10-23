import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowTransitionRulesDeleteWorkflowTransitionRuleConfigurations = defineTool({
  name: 'workflows:workflow_transition_rules:delete_workflow_transition_rule_configurations',
  description:
    'Delete workflow transition rule configurations. Deletes workflow transition rules from one or more workflows. These rule types are supported:',
  input: {
    type: 'object',
    properties: {
      workflows: {
        type: 'array',
        description: 'The list of workflows with transition rules to delete.',
        items: {
          type: 'object',
          description: 'Details about a workflow configuration update request.',
          properties: {
            workflowId: {
              type: 'object',
              description: 'Properties that identify a workflow.',
            },
            workflowRuleIds: {
              type: 'array',
              description: 'The list of connect workflow rule IDs.',
              items: {
                type: 'string',
                description: 'The list of connect workflow rule IDs.',
              },
            },
          },
          required: ['workflowId', 'workflowRuleIds'],
        },
      },
    },
    required: ['workflows'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/workflow/rule/config/delete',
    body: ['workflows'],
  },
});
