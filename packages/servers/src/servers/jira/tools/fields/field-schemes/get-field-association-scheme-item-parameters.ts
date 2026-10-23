import { defineTool } from '@usemcpkit/core';

export const fieldsFieldSchemesGetFieldAssociationSchemeItemParameters = defineTool({
  name: 'fields:field_schemes:get_field_association_scheme_item_parameters',
  description: 'Get field parameters. Retrieve field association parameters on a field association scheme',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'the ID of the field association scheme to retrieve parameters for',
      },
      fieldId: {
        type: 'string',
        description: 'the ID of the field',
      },
    },
    required: ['id', 'fieldId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/config/fieldschemes/{id}/fields/{fieldId}/parameters',
  },
});
