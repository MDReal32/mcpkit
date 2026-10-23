import { defineTool } from '@usemcpkit/core';

export const codeSecurityGetConfigurationsForEnterprise = defineTool({
  name: 'code_security:get_configurations_for_enterprise',
  description:
    'Get code security configurations for an enterprise. Lists all code security configurations available in an enterprise.',
  input: {
    type: 'object',
    properties: {
      enterprise: {
        type: 'string',
        description: 'The slug version of the enterprise name.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      before: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results before this cursor. For more information, see "Using pagination in the REST API."',
      },
      after: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results after this cursor. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['enterprise'],
  },
  request: {
    method: 'GET',
    path: '/enterprises/{enterprise}/code-security/configurations',
    query: ['per_page', 'before', 'after'],
  },
});
