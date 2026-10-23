import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowTransitionRulesGetWorkflowTransitionRuleConfigurations = defineTool({
  name: 'workflows:workflow_transition_rules:get_workflow_transition_rule_configurations',
  description:
    'Get workflow transition rule configurations. Returns a paginated list of workflows with transition rules. The workflows can be filtered to return only those containing workflow transition rules:',
  input: {
    type: 'object',
    properties: {
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'integer',
        default: 10,
        description: 'The maximum number of items to return per page.',
      },
      types: {
        type: 'string',
        description: 'The types of the transition rules to return. (comma-separated)',
      },
      keys: {
        type: 'string',
        description:
          'The transition rule class keys, as defined in the Connect or the Forge app descriptor, of the transition rules to return. (comma-separated)',
      },
      workflowNames: {
        type: 'string',
        description: 'The list of workflow names to filter by. (comma-separated)',
      },
      withTags: {
        type: 'string',
        description: 'The list of `tags` to filter by. (comma-separated)',
      },
      draft: {
        type: 'boolean',
        description:
          "**Deprecated:** Whether draft or published workflows are returned. If not provided, both workflow types are returned. The 'draft' parameter will be removed from this API on November 2, 2026.",
      },
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information in the response. This parameter accepts `transition`, which, for each rule, returns information about the transition the rule is assigned to.',
      },
    },
    required: ['types'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/workflow/rule/config',
    query: ['startAt', 'maxResults', 'types', 'keys', 'workflowNames', 'withTags', 'draft', 'expand'],
  },
});
