import { defineTool } from '@usemcpkit/core';

export const fieldsFieldSchemesGetFieldAssociationSchemes = defineTool({
  name: 'fields:field_schemes:get_field_association_schemes',
  description:
    'Get field schemes. REST endpoint for retrieving a paginated list of field association schemes with optional filtering.',
  input: {
    type: 'object',
    properties: {
      projectId: {
        type: 'string',
        description:
          '(optional) List of project IDs to filter schemes by. If not provided, schemes from all projects are returned. (comma-separated)',
      },
      query: {
        type: 'string',
        description:
          '(optional) Text filter for scheme name or description matching (case-insensitive). If not provided, no text filtering is applied.',
      },
      startAt: {
        type: 'integer',
        default: 0,
        description: 'Zero-based index of the first item to return (default: 0)',
      },
      maxResults: {
        type: 'integer',
        default: 50,
        description: 'Maximum number of items to return per page (default: 50, max: 100)',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/config/fieldschemes',
    query: ['projectId', 'query', 'startAt', 'maxResults'],
  },
});
