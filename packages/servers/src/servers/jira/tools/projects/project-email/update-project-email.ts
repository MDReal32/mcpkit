import { defineTool } from '@usemcpkit/core';

export const projectsProjectEmailUpdateProjectEmail = defineTool({
  name: 'projects:project_email:update_project_email',
  description: "Set project's sender email. Sets the project's sender email address.",
  input: {
    type: 'object',
    properties: {
      projectId: {
        type: 'integer',
        description: 'The project ID.',
      },
      emailAddress: {
        type: 'string',
        description: 'The email address.',
      },
      emailAddressStatus: {
        type: 'array',
        description: 'When using a custom domain, the status of the email address.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['projectId'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/project/{projectId}/email',
    body: ['emailAddress', 'emailAddressStatus'],
  },
});
