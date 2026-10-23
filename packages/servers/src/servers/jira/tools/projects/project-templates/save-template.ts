import { defineTool } from '@usemcpkit/core';

export const projectsProjectTemplatesSaveTemplate = defineTool({
  name: 'projects:project_templates:save_template',
  description: 'Save a custom project template. Save custom template',
  input: {
    type: 'object',
    properties: {
      templateDescription: {
        type: 'string',
        description: 'The description of the template',
      },
      templateFromProjectRequest: {
        type: 'object',
        description: 'The request details to generate template from a project',
        properties: {
          projectId: {
            type: 'integer',
            description: 'The ID of the target project',
          },
          templateGenerationOptions: {
            type: 'object',
            properties: {
              enableScreenDelegatedAdminSupport: {
                type: 'boolean',
                description:
                  'Enable screen delegated admin support for the template. This means screen and associated schemes will be copied rather than referenced.',
              },
              enableWorkflowDelegatedAdminSupport: {
                type: 'boolean',
                description:
                  'Enable workflow delegated admin support for the template. This means workflows and workflow schemes will be copied rather than referenced.',
              },
            },
          },
          templateType: {
            type: 'string',
            description: 'The type of the template: LIVE | SNAPSHOT',
            enum: ['LIVE', 'SNAPSHOT'],
          },
        },
      },
      templateName: {
        type: 'string',
        description: 'The name of the template',
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/project-template/save-template',
    body: ['templateDescription', 'templateFromProjectRequest', 'templateName'],
  },
});
