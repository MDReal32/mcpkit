import { defineTool } from '@usemcpkit/core';

export const projectsProjectTemplatesLiveTemplate = defineTool({
  name: 'projects:project_templates:live_template',
  description: 'Gets a custom project template. Get custom template',
  input: {
    type: 'object',
    properties: {
      projectId: {
        type: 'string',
        description:
          'optional - The \\{@link String\\} containing the project key linked to the custom template to retrieve',
      },
      templateKey: {
        type: 'string',
        description: 'optional - The \\{@link String\\} containing the key of the custom template to retrieve',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/project-template/live-template',
    query: ['projectId', 'templateKey'],
  },
});
