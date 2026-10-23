import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldsGetFields = defineTool({
  name: 'fields:issue_fields:get_fields',
  description: 'Get fields. Returns system and custom issue fields according to the following rules:',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/field',
  },
});
