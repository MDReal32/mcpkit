import { defineTool } from '@usemcpkit/core';

export const securityCodeSecurityGetRepositoriesForConfiguration = defineTool({
  name: 'security:code_security:get_repositories_for_configuration',
  description:
    'Get repositories associated with a code security configuration. Lists the repositories associated with a code security configuration in an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
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
    required: ['org', 'configuration_id'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/code-security/configurations/{configuration_id}/repositories',
    query: ['per_page', 'before', 'after', 'status'],
  },
});
