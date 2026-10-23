import { defineTool } from '@usemcpkit/core';

export const codespacesPublishForAuthenticatedUser = defineTool({
  name: 'codespaces:publish_for_authenticated_user',
  description:
    'Create a repository from an unpublished codespace. Publishes an unpublished codespace, creating a new repository and assigning it to the codespace.',
  input: {
    type: 'object',
    properties: {
      codespace_name: {
        type: 'string',
        description: 'The name of the codespace.',
      },
      name: {
        type: 'string',
        description: 'A name for the new repository.',
      },
      private: {
        type: 'boolean',
        description: 'Whether the new repository should be private.',
        default: false,
      },
    },
    required: ['codespace_name'],
  },
  request: {
    method: 'POST',
    path: '/user/codespaces/{codespace_name}/publish',
    body: ['name', 'private'],
  },
});
