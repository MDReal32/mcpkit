import { defineTool } from '@usemcpkit/core';

export const orgsOrgsCustomPropertiesForReposGetOrganizationValues = defineTool({
  name: 'orgs:orgs:custom_properties_for_repos_get_organization_values',
  description:
    'List custom property values for organization repositories. Lists organization repositories with all of their custom property values. Organization members can read these properties.',
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
      repository_query: {
        type: 'string',
        description:
          'Finds repositories in the organization with a query containing one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see Constructing a search query. See "Searching for repositories" for a detailed list of qualifiers.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/properties/values',
    query: ['per_page', 'page', 'repository_query'],
  },
});
