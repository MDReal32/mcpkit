import { defineTool } from '@usemcpkit/core';

export const fieldsIssueSecuritySchemesAddSecurityLevel = defineTool({
  name: 'fields:issue_security_schemes:add_security_level',
  description:
    "Add issue security levels. Adds levels and levels' members to the issue security scheme. You can add up to 100 levels per request.",
  input: {
    type: 'object',
    properties: {
      schemeId: {
        type: 'string',
        description: 'The ID of the issue security scheme.',
      },
      levels: {
        type: 'array',
        description: 'The list of scheme levels which should be added to the security scheme.',
        items: {
          type: 'object',
          properties: {
            description: {
              type: 'string',
              description: 'The description of the issue security scheme level.',
            },
            isDefault: {
              type: 'boolean',
              description: 'Specifies whether the level is the default level. False by default.',
            },
            members: {
              type: 'array',
              description: 'The list of level members which should be added to the issue security scheme level.',
              items: {
                type: 'object',
              },
            },
            name: {
              type: 'string',
              description: 'The name of the issue security scheme level. Must be unique.',
            },
          },
          required: ['name'],
        },
      },
    },
    required: ['schemeId'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/issuesecurityschemes/{schemeId}/level',
    body: ['levels'],
  },
});
