import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldsGetFieldProjectAssociations = defineTool({
  name: 'fields:issue_fields:get_field_project_associations',
  description:
    'Get field project associations. Returns a paginated list of project associations for the given custom field. Each association contains the ID of a project the field is associated with.',
  input: {
    type: 'object',
    properties: {
      fieldId: {
        type: 'string',
        description: 'The ID of the field, for example `customfield_10000`.',
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
    path: '/rest/api/2/field/{fieldId}/association/project',
    query: ['startAt', 'maxResults'],
  },
});
