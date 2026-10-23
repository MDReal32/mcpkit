import { defineTool } from '@usemcpkit/core';

export const projectsTemplatesListTemplatesLicenses = defineTool({
  name: 'projects:templates:list_templates_licenses',
  description: 'List all license templates. Lists all available license templates.',
  input: {
    type: 'object',
    properties: {
      popular: {
        type: 'boolean',
        description: "If `true`, returns only popular licenses. If `false`, returns only licenses that aren't popular.",
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/templates/licenses',
    query: ['popular', 'page', 'per_page'],
  },
});
