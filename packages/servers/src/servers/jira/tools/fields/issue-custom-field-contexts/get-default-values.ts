import { defineTool } from '@usemcpkit/core';

export const fieldsIssueCustomFieldContextsGetDefaultValues = defineTool({
  name: 'fields:issue_custom_field_contexts:get_default_values',
  description:
    '[Deprecated] Get custom field contexts default values. Returns a paginated list of defaults for a custom field. The results can be filtered by `contextId`, otherwise all values are returned. If no defaults are set for a context, nothing is returned. The returned object depends on type of the custom field:',
  input: {
    type: 'object',
    properties: {
      fieldId: {
        type: 'string',
        description: 'The ID of the custom field, for example `customfield\\_10000`.',
      },
      contextId: {
        type: 'string',
        description: 'The IDs of the contexts. (comma-separated)',
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
    path: '/rest/api/2/field/{fieldId}/context/defaultValue',
    query: ['contextId', 'startAt', 'maxResults'],
  },
});
