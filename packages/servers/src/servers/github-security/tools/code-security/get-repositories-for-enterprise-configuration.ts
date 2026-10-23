import { defineTool } from '@usemcpkit/core';

export const codeSecurityGetRepositoriesForEnterpriseConfiguration = defineTool({
  name: 'code_security:get_repositories_for_enterprise_configuration',
  description:
    'Get repositories associated with an enterprise code security configuration. Lists the repositories associated with an enterprise code security configuration in an organization.',
  input: {
    type: 'object',
    properties: {
      enterprise: {
        type: 'string',
        description: 'The slug version of the enterprise name.',
      },
      configuration_id: {
        type: 'integer',
        description: 'The unique identifier of the code security configuration.',
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
      status: {
        type: 'string',
        default: 'all',
        description:
          'A comma-separated list of statuses. If specified, only repositories with these attachment statuses will be returned.',
      },
    },
    required: ['enterprise', 'configuration_id'],
  },
  request: {
    method: 'GET',
    path: '/enterprises/{enterprise}/code-security/configurations/{configuration_id}/repositories',
    query: ['per_page', 'before', 'after', 'status'],
  },
});
