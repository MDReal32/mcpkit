import { defineTool } from '@usemcpkit/core';

export const projectsGetForOrg = defineTool({
  name: 'projects:get_for_org',
  description: 'Get project for organization. Get a specific organization-owned project.',
  input: {
    type: 'object',
    properties: {
      project_number: {
        type: 'integer',
        description: "The project's number.",
      },
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
    },
    required: ['project_number', 'org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/projectsV2/{project_number}',
  },
});
