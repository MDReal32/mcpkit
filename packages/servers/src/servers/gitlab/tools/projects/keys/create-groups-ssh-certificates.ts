import { defineTool } from '@usemcpkit/core';

export const projectsKeysCreateGroupsSshCertificates = defineTool({
  name: 'projects:keys:create_groups_ssh_certificates',
  description: 'Add a group SSH certificate. Adds a group SSH certificate for a specified group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      title: {
        type: 'string',
        description: 'Title of the SSH certificate.',
      },
      key: {
        type: 'string',
        description: 'Public key of the SSH certificate.',
      },
    },
    required: ['id', 'title', 'key'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/ssh_certificates',
    body: ['title', 'key'],
  },
});
