import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldsGetTrashedFieldsPaginated = defineTool({
  name: 'fields:issue_fields:get_trashed_fields_paginated',
  description:
    'Get fields in trash paginated. Returns a paginated list of fields in the trash. The list may be restricted to fields whose field name or description partially match a string.',
  input: {
    type: 'object',
    properties: {
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
      id: {
        type: 'string',
        description: '(comma-separated)',
      },
      query: {
        type: 'string',
        description: 'String used to perform a case-insensitive partial match with field names or descriptions.',
      },
      expand: {
        type: 'string',
        enum: [
          'name',
          '-name',
          '+name',
          'trashDate',
          '-trashDate',
          '+trashDate',
          'plannedDeletionDate',
          '-plannedDeletionDate',
          '+plannedDeletionDate',
          'projectsCount',
          '-projectsCount',
          '+projectsCount',
        ],
      },
      orderBy: {
        type: 'string',
        description: 'Order the results by a field:',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/field/search/trashed',
    query: ['startAt', 'maxResults', 'id', 'query', 'expand', 'orderBy'],
  },
});
