import { defineTool } from '@usemcpkit/core';

export const projectsProjectClassificationLevelsRemoveDefaultProjectClassification = defineTool({
  name: 'projects:project_classification_levels:remove_default_project_classification',
  description:
    'Remove the default data classification level from a project. Remove the default data classification level for a project.',
  input: {
    type: 'object',
    properties: {
      projectIdOrKey: {
        type: 'string',
        description: 'The project ID or project key (case-sensitive).',
      },
    },
    required: ['projectIdOrKey'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/project/{projectIdOrKey}/classification-level/default',
  },
});
