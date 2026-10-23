import { defineTool } from '@usemcpkit/core';

export const codespacesRepoMachinesForAuthenticatedUser = defineTool({
  name: 'codespaces:repo_machines_for_authenticated_user',
  description:
    'List available machine types for a repository. List the machine types available for a given repository based on its configuration.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      location: {
        type: 'string',
        description: 'The location to check for available machines. Assigned by IP if not provided.',
      },
      client_ip: {
        type: 'string',
        description: 'IP for location auto-detection when proxying a request',
      },
      ref: {
        type: 'string',
        description: 'The branch or commit to check for prebuild availability and devcontainer restrictions.',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/codespaces/machines',
    query: ['location', 'client_ip', 'ref'],
  },
});
