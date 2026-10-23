import { defineTool } from '@usemcpkit/core';

export const issuesProjectsGetFieldForOrg = defineTool({
  name: 'issues:projects:get_field_for_org',
  description: 'Get project field for organization. Get a specific field for an organization-owned project.',
  input: {
    type: 'object',
    properties: {
      project_number: {
        type: 'integer',
        description: "The project's number.",
      },
      field_id: {
        type: 'integer',
        description: 'The unique identifier of the field.',
      },
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
    },
    required: ['project_number', 'field_id', 'org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/projectsV2/{project_number}/fields/{field_id}',
  },
});
