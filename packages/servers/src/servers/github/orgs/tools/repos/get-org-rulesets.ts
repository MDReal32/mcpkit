import { defineTool } from '@usemcpkit/core';

export const reposGetOrgRulesets = defineTool({
  name: 'repos:get_org_rulesets',
  description: 'Get all organization repository rulesets. Get all the repository rulesets for an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      targets: {
        type: 'string',
        description:
          'A comma-separated list of rule targets to filter by. If provided, only rulesets that apply to the specified targets will be returned. For example, `branch,tag,push`.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/rulesets',
    query: ['per_page', 'page', 'targets'],
  },
});
