import { defineTool } from '@usemcpkit/core';

export const projectsDeployResourcesCreateProjectsDeployKeysEnable = defineTool({
  name: 'projects:deploy_resources:create_projects_deploy_keys_enable',
  description:
    'Enable a deploy key. Enables a deploy key for a project so this can be used. Returns the enabled key, with a status code 201 when successful.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      key_id: {
        type: 'integer',
        description: 'ID of the deploy key.',
      },
    },
    required: ['id', 'key_id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/deploy_keys/{key_id}/enable',
  },
});
