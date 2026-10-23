import { defineTool } from '@usemcpkit/core';

export const fieldsIssueSecuritySchemesCreateIssueSecurityScheme = defineTool({
  name: 'fields:issue_security_schemes:create_issue_security_scheme',
  description:
    "Create issue security scheme. Creates a security scheme with security scheme levels and levels' members. You can create up to 100 security scheme levels and security scheme levels' members per request.",
  input: {
    type: 'object',
    properties: {
      description: {
        type: 'string',
        description: 'The description of the issue security scheme.',
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
      name: {
        type: 'string',
        description: 'The name of the issue security scheme. Must be unique (case-insensitive).',
      },
    },
    required: ['name'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/issuesecurityschemes',
    body: ['description', 'levels', 'name'],
  },
});
