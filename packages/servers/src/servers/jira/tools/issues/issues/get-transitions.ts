import { defineTool } from '@usemcpkit/core';

export const issuesIssuesGetTransitions = defineTool({
  name: 'issues:issues:get_transitions',
  description:
    "Get transitions. Returns either all transitions or a transition that can be performed by the user on an issue, based on the issue's status.",
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'The ID or key of the issue.',
      },
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information about transitions in the response. This parameter accepts `transitions.fields`, which returns information about the fields in the transition screen for each transition. Fields hidden from the screen are not returned. Use this information to populate the `fields` and `update` fields in Transition issue.',
      },
      transitionId: {
        type: 'string',
        description: 'The ID of the transition.',
      },
      skipRemoteOnlyCondition: {
        type: 'boolean',
        default: false,
        description:
          'Whether transitions with the condition *Hide From User Condition* are included in the response. Available to Connect and Forge app users with *Administer Jira* global permission and Forge apps acting on behalf of users with *Administer Jira* global permission.',
      },
      includeUnavailableTransitions: {
        type: 'boolean',
        default: false,
        description: 'Whether details of transitions that fail a condition are included in the response',
      },
      sortByOpsBarAndStatus: {
        type: 'boolean',
        default: false,
        description:
          'Whether the transitions are sorted by ops-bar sequence value first then category order (Todo, In Progress, Done) or only by ops-bar sequence value.',
      },
    },
    required: ['issueIdOrKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issue/{issueIdOrKey}/transitions',
    query: [
      'expand',
      'transitionId',
      'skipRemoteOnlyCondition',
      'includeUnavailableTransitions',
      'sortByOpsBarAndStatus',
    ],
  },
});
