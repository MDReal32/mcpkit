import { defineTool } from '@usemcpkit/core';

export const fieldsFieldSchemesGetFieldAssociationSchemeById = defineTool({
  name: 'fields:field_schemes:get_field_association_scheme_by_id',
  description: 'Get field scheme. Endpoint for fetching a field association scheme by its ID',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The scheme id to fetch',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/config/fieldschemes/{id}',
  },
});
