import { defineTool } from '@usemcpkit/core';

export const fieldsIssueSecuritySchemesAssociateSchemesToProjects = defineTool({
  name: 'fields:issue_security_schemes:associate_schemes_to_projects',
  description:
    'Associate security scheme to project. Associates an issue security scheme with a project and remaps security levels of issues to the new levels, if provided.',
  input: {
    type: 'object',
    properties: {
      oldToNewSecurityLevelMappings: {
        type: 'array',
        description: 'The list of scheme levels which should be remapped to new levels of the issue security scheme.',
        items: {
          type: 'object',
          properties: {
            newLevelId: {
              type: 'string',
              description:
                'The new issue security level ID. Providing null will clear the assigned old level from issues.',
            },
            oldLevelId: {
              type: 'string',
              description:
                'The old issue security level ID. Providing null will remap all issues without any assigned levels.',
            },
          },
          required: ['newLevelId', 'oldLevelId'],
        },
      },
      projectId: {
        type: 'string',
        description: 'The ID of the project.',
      },
      schemeId: {
        type: 'string',
        description:
          'The ID of the issue security scheme. Providing null will clear the association with the issue security scheme.',
      },
    },
    required: ['projectId', 'schemeId'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/issuesecurityschemes/project',
    body: ['oldToNewSecurityLevelMappings', 'projectId', 'schemeId'],
  },
});
