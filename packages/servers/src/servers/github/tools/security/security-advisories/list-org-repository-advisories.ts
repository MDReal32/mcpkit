import { defineTool } from '@usemcpkit/core';

export const securitySecurityAdvisoriesListOrgRepositoryAdvisories = defineTool({
  name: 'security:security_advisories:list_org_repository_advisories',
  description:
    'List repository security advisories for an organization. Lists repository security advisories for an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      direction: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'The direction to sort the results by.',
      },
      sort: {
        type: 'string',
        default: 'created',
        enum: ['created', 'updated', 'published'],
        description: 'The property to sort the results by.',
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
          'The number of advisories to return per page. For more information, see "Using pagination in the REST API."',
      },
      state: {
        type: 'string',
        enum: ['triage', 'draft', 'published', 'closed'],
        description:
          'Filter by the state of the repository advisories. Only advisories of this state will be returned.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/security-advisories',
    query: ['direction', 'sort', 'before', 'after', 'per_page', 'state'],
  },
});
