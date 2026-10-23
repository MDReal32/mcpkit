import { defineTool } from '@usemcpkit/core';

export const projectsProjectClassificationLevelsUpdateDefaultProjectClassification = defineTool({
  name: 'projects:project_classification_levels:update_default_project_classification',
  description:
    'Update the default data classification level of a project. Updates the default data classification level for a project.',
  input: {
    type: 'object',
    properties: {
      projectIdOrKey: {
        type: 'string',
        description: 'The project ID or project key (case-sensitive).',
      },
      id: {
        type: 'string',
        description: 'The ID of the project classification.',
      },
    },
    required: ['projectIdOrKey', 'id'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/project/{projectIdOrKey}/classification-level/default',
    body: ['id'],
  },
});
