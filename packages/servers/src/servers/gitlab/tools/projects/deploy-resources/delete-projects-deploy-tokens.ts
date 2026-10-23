import { defineTool } from '@usemcpkit/core';

export const projectsDeployResourcesDeleteProjectsDeployTokens = defineTool({
  name: 'projects:deploy_resources:delete_projects_deploy_tokens',
  description: 'Delete a project deploy token. Deletes a project deploy token.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      token_id: {
        type: 'integer',
        description: 'ID of the deploy token.',
      },
    },
    required: ['id', 'token_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/deploy_tokens/{token_id}',
  },
});
