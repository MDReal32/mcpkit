import { defineTool } from '@usemcpkit/core';

export const issuesProjectsListForOrg = defineTool({
  name: 'issues:projects:list_for_org',
  description:
    'List projects for organization. List all projects owned by a specific organization accessible by the authenticated user.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      q: {
        type: 'string',
        description: 'Limit results to projects of the specified type.',
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
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/projectsV2',
    query: ['q', 'before', 'after', 'per_page'],
  },
});
