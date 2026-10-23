import { defineTool } from '@usemcpkit/core';

export const projectsProjectVersionsGetProjectVersionsPaginated = defineTool({
  name: 'projects:project_versions:get_project_versions_paginated',
  description:
    'Get project versions paginated. Returns a paginated list of all versions in a project. See the Get project versions resource if you want to get a full list of versions without pagination.',
  input: {
    type: 'object',
    properties: {
      projectIdOrKey: {
        type: 'string',
        description: 'The project ID or project key (case sensitive).',
      },
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'integer',
        default: 50,
        description: 'The maximum number of items to return per page.',
      },
      orderBy: {
        type: 'string',
        enum: [
          'description',
          '-description',
          '+description',
          'name',
          '-name',
          '+name',
          'releaseDate',
          '-releaseDate',
          '+releaseDate',
          'sequence',
          '-sequence',
          '+sequence',
          'startDate',
          '-startDate',
          '+startDate',
        ],
        description: 'Order the results by a field:',
      },
      query: {
        type: 'string',
        description:
          'Filter the results using a literal string. Versions with matching `name` or `description` are returned (case insensitive).',
      },
      status: {
        type: 'string',
        description:
          'A list of status values used to filter the results by version status. This parameter accepts a comma-separated list. The status values are `released`, `unreleased`, and `archived`.',
      },
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:',
      },
    },
    required: ['projectIdOrKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/project/{projectIdOrKey}/version',
    query: ['startAt', 'maxResults', 'orderBy', 'query', 'status', 'expand'],
  },
});
