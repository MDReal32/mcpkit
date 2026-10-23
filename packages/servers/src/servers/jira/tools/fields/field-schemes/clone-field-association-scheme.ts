import { defineTool } from '@usemcpkit/core';

export const fieldsFieldSchemesCloneFieldAssociationScheme = defineTool({
  name: 'fields:field_schemes:clone_field_association_scheme',
  description: 'Clone field scheme. Endpoint for cloning an existing field association scheme into a new one.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the source field association scheme to clone from',
      },
      description: {
        type: 'string',
        description: 'Description of the scheme to be created',
      },
      name: {
        type: 'string',
        description: 'The name of the scheme to be created',
      },
    },
    required: ['id', 'name'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/config/fieldschemes/{id}/clone',
    body: ['description', 'name'],
  },
});
