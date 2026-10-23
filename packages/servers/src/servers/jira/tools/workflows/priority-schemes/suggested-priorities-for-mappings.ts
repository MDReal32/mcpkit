import { defineTool } from '@usemcpkit/core';

export const workflowsPrioritySchemesSuggestedPrioritiesForMappings = defineTool({
  name: 'workflows:priority_schemes:suggested_priorities_for_mappings',
  description:
    'Suggested priorities for mappings. Returns a paginated list of priorities that would require mapping, given a change in priorities or projects associated with a priority scheme.',
  input: {
    type: 'object',
    properties: {
      maxResults: {
        type: 'integer',
        description: 'The maximum number of results that could be on the page.',
      },
      priorities: {
        type: 'object',
        description: 'The priority changes in the scheme.',
        properties: {
          add: {
            type: 'array',
            description: 'The ids of priorities being removed from the scheme.',
            items: {
              type: 'integer',
            },
          },
          remove: {
            type: 'array',
            description: 'The ids of priorities being removed from the scheme.',
            items: {
              type: 'integer',
            },
          },
        },
      },
      projects: {
        type: 'object',
        description: 'The project changes in the scheme.',
        properties: {
          add: {
            type: 'array',
            description: 'The ids of projects being added to the scheme.',
            items: {
              type: 'integer',
            },
          },
        },
      },
      schemeId: {
        type: 'integer',
        description: 'The id of the priority scheme.',
      },
      startAt: {
        type: 'integer',
        description: 'The index of the first item returned on the page.',
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/priorityscheme/mappings',
    body: ['maxResults', 'priorities', 'projects', 'schemeId', 'startAt'],
  },
});
