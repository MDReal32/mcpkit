import { defineTool } from '@usemcpkit/core';

export const projectsProjectsListProjectsSecuritySettings = defineTool({
  name: 'projects:projects:list_projects_security_settings',
  description:
    'List all project security settings. Lists all security settings for the project. You must have the Security Manager, Developer, Maintainer, or Owner role for the project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/security_settings',
  },
});
