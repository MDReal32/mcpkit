import { defineTool } from '@usemcpkit/core';

export const ciCiTriggersGetProjectsTriggers = defineTool({
  name: 'ci:ci_triggers:get_projects_triggers',
  description: 'Retrieve trigger token details. Retrieves details of a pipeline trigger token for a project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      trigger_id: {
        type: 'integer',
        description: 'ID of the trigger token.',
      },
    },
    required: ['id', 'trigger_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/triggers/{trigger_id}',
  },
});
