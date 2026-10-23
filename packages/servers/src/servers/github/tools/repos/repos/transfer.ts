import { defineTool } from '@usemcpkit/core';

export const reposReposTransfer = defineTool({
  name: 'repos:repos:transfer',
  description:
    'Transfer a repository. A transfer request will need to be accepted by the new owner when transferring a personal repository to another user. The response will contain the original `owner`, and the transfer will continue asynchronously. For more details on the requirements to transfer personal and organization-owned repositories, see about repository transfers.',
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
      new_owner: {
        type: 'string',
        description: 'The username or organization name the repository will be transferred to.',
      },
      new_name: {
        type: 'string',
        description: 'The new name to be given to the repository.',
      },
      team_ids: {
        type: 'array',
        description:
          'ID of the team or teams to add to the repository. Teams can only be added to organization-owned repositories.',
        items: {
          type: 'integer',
        },
      },
    },
    required: ['owner', 'repo', 'new_owner'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/transfer',
    body: ['new_owner', 'new_name', 'team_ids'],
  },
});
