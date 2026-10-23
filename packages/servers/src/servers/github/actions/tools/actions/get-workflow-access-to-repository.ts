import { defineTool } from '@usemcpkit/core';

export const actionsGetWorkflowAccessToRepository = defineTool({
  name: 'actions:get_workflow_access_to_repository',
  description:
    'Get the level of access for workflows outside of the repository. Gets the level of access that workflows outside of the repository have to actions and reusable workflows in the repository. This endpoint only applies to private repositories. For more information, see "Allowing access to components in a private repository."',
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
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/permissions/access',
  },
});
