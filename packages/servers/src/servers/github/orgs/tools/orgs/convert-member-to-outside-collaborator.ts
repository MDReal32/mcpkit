import { defineTool } from '@usemcpkit/core';

export const orgsConvertMemberToOutsideCollaborator = defineTool({
  name: 'orgs:convert_member_to_outside_collaborator',
  description:
    'Convert an organization member to outside collaborator. When an organization member is converted to an outside collaborator, they\'ll only have access to the repositories that their current team membership allows. The user will no longer be a member of the organization. For more information, see "Converting an organization member to an outside collaborator". Converting an organization member to an outside collaborator may be restricted by enterprise ad…',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      async: {
        type: 'boolean',
        description:
          'When set to `true`, the request will be performed asynchronously. Returns a 202 status code when the job is successfully queued.',
        default: false,
      },
    },
    required: ['org', 'username'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/outside_collaborators/{username}',
    body: ['async'],
  },
});
