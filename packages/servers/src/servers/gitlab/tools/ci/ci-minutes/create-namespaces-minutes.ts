import { defineTool } from '@usemcpkit/core';

export const ciCiMinutesCreateNamespacesMinutes = defineTool({
  name: 'ci:ci_minutes:create_namespaces_minutes',
  description: '[Deprecated] Create a compute minutes purchase record for the namespace. Deprecated in GitLab 17.7',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID of the namespace.',
      },
      packs: {
        type: 'array',
        description: 'Array of additional purchased minute packs.',
        items: {
          type: 'object',
          properties: {
            number_of_minutes: {
              type: 'integer',
              description: 'Number of additional minutes purchased.',
            },
            expires_at: {
              type: 'string',
              description: 'Date when the purchase expires.',
            },
            purchase_xid: {
              type: 'string',
              description: 'Purchase ID for the additional minutes.',
            },
          },
          required: ['number_of_minutes', 'expires_at', 'purchase_xid'],
        },
      },
    },
    required: ['id', 'packs'],
  },
  request: {
    method: 'POST',
    path: '/namespaces/{id}/minutes',
    body: ['packs'],
  },
});
