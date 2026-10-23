import { defineTool } from '@usemcpkit/core';

export const securityCodeSecurityGetConfigurationsForOrg = defineTool({
  name: 'security:code_security:get_configurations_for_org',
  description:
    'Get code security configurations for an organization. Lists all code security configurations available in an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      target_type: {
        type: 'string',
        default: 'all',
        enum: ['global', 'all'],
        description: 'The target type of the code security configuration',
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
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/code-security/configurations',
    query: ['target_type', 'per_page', 'before', 'after'],
  },
});
