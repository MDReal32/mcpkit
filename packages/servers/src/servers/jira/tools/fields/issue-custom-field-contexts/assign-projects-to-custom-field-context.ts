import { defineTool } from '@usemcpkit/core';

export const fieldsIssueCustomFieldContextsAssignProjectsToCustomFieldContext = defineTool({
  name: 'fields:issue_custom_field_contexts:assign_projects_to_custom_field_context',
  description: 'Assign custom field context to projects. Assigns a custom field context to projects.',
  input: {
    type: 'object',
    properties: {
      fieldId: {
        type: 'string',
        description: 'The ID of the custom field.',
      },
      contextId: {
        type: 'integer',
        description: 'The ID of the context.',
      },
      projectIds: {
        type: 'array',
        description: 'The IDs of projects.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['fieldId', 'contextId', 'projectIds'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/field/{fieldId}/context/{contextId}/project',
    body: ['projectIds'],
  },
});
