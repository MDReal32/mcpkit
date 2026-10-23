import { defineTool } from '@usemcpkit/core';

export const fieldsIssueCustomFieldContextsGetContextsForField = defineTool({
  name: 'fields:issue_custom_field_contexts:get_contexts_for_field',
  description:
    'Get custom field contexts. Returns a paginated list of contexts for a custom field. Contexts can be returned as follows:',
  input: {
    type: 'object',
    properties: {
      fieldId: {
        type: 'string',
        description: 'The ID of the custom field.',
      },
      isAnyIssueType: {
        type: 'boolean',
        description: 'Whether to return contexts that apply to all issue types.',
      },
      isGlobalContext: {
        type: 'boolean',
        description: 'Whether to return contexts that apply to all projects.',
      },
      contextId: {
        type: 'string',
        description:
          'The list of context IDs. To include multiple contexts, separate IDs with ampersand: `contextId=10000&contextId=10001`. (comma-separated)',
      },
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'integer',
        default: 50,
        description: 'The maximum number of items to return per page.',
      },
    },
    required: ['fieldId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/field/{fieldId}/context',
    query: ['isAnyIssueType', 'isGlobalContext', 'contextId', 'startAt', 'maxResults'],
  },
});
