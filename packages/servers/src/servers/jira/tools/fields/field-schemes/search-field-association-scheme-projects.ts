import { defineTool } from '@usemcpkit/core';

export const fieldsFieldSchemesSearchFieldAssociationSchemeProjects = defineTool({
  name: 'fields:field_schemes:search_field_association_scheme_projects',
  description:
    'Search field scheme projects. REST Endpoint for searching for projects belonging to a given field association scheme',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The scheme id to search for associated projects',
      },
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The starting index of the returned projects. Base index: 0.',
      },
      maxResults: {
        type: 'integer',
        default: 50,
        description: 'The maximum number of projects to return per page, maximum allowed value is 100.',
      },
      projectId: {
        type: 'string',
        description:
          'The project Ids to filter by, if empty then all projects belonging to a field association scheme will be returned (comma-separated)',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/config/fieldschemes/{id}/projects',
    query: ['startAt', 'maxResults', 'projectId'],
  },
});
