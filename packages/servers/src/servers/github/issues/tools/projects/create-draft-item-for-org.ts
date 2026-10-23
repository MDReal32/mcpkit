import { defineTool } from '@usemcpkit/core';

export const projectsCreateDraftItemForOrg = defineTool({
  name: 'projects:create_draft_item_for_org',
  description:
    'Create draft item for organization owned project. Create draft issue item for the specified organization owned project.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      project_number: {
        type: 'integer',
        description: "The project's number.",
      },
      title: {
        type: 'string',
        description: 'The title of the draft issue item to create in the project.',
      },
      body: {
        type: 'string',
        description: 'The body content of the draft issue item to create in the project.',
      },
    },
    required: ['org', 'project_number', 'title'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/projectsV2/{project_number}/drafts',
    body: ['title', 'body'],
  },
});
