import { defineTool } from '@usemcpkit/core';

export const usersApplicationsCreateUserApplications = defineTool({
  name: 'users:applications:create_user_applications',
  description:
    'Create an application. Creates a new OAuth application for the authenticated user. This feature was introduced in GitLab 19.0',
  input: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Name of the application.',
      },
      redirect_uri: {
        type: 'string',
        description: 'Redirect URI of the application.',
      },
      scopes: {
        type: 'string',
        description: 'Scopes available to the application. Separate multiple scopes with a space.',
      },
      confidential: {
        type: 'boolean',
        description:
          'If `true`, the application can securely store client credentials, such as the client secret. Non-confidential applications (such as native mobile apps and Single Page Apps) might expose client credentials.',
        default: true,
      },
    },
    required: ['name', 'redirect_uri', 'scopes'],
  },
  request: {
    method: 'POST',
    path: '/user/applications',
    body: ['name', 'redirect_uri', 'scopes', 'confidential'],
  },
});
