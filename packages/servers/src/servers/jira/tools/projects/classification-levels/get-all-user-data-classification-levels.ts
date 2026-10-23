import { defineTool } from '@usemcpkit/core';

export const projectsClassificationLevelsGetAllUserDataClassificationLevels = defineTool({
  name: 'projects:classification_levels:get_all_user_data_classification_levels',
  description: 'Get all classification levels. Returns all classification levels.',
  input: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        description: 'Optional set of statuses to filter by. (comma-separated)',
      },
      orderBy: {
        type: 'string',
        enum: ['rank', '-rank', '+rank'],
        description: 'Ordering of the results by a given field. If not provided, values will not be sorted.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/classification-levels',
    query: ['status', 'orderBy'],
  },
});
