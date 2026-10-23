import { defineTool } from '@usemcpkit/core';

export const projectsPushRulesGetProjectsPushRule = defineTool({
  name: 'projects:push_rules:get_projects_push_rule',
  description: 'Retrieve the push rules of a project. Retrieves the push rules of a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/push_rule',
  },
});
