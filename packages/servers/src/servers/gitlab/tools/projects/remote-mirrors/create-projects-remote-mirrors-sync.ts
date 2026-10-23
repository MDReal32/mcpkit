import { defineTool } from '@usemcpkit/core';

export const projectsRemoteMirrorsCreateProjectsRemoteMirrorsSync = defineTool({
  name: 'projects:remote_mirrors:create_projects_remote_mirrors_sync',
  description: 'Force push mirror update. Forces an update to a push mirror.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      mirror_id: {
        type: 'string',
        description: 'ID of the remote mirror.',
      },
    },
    required: ['id', 'mirror_id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/remote_mirrors/{mirror_id}/sync',
  },
});
