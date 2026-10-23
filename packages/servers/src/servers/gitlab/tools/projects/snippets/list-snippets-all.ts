import { defineTool } from '@usemcpkit/core';

export const projectsSnippetsListSnippetsAll = defineTool({
  name: 'projects:snippets:list_snippets_all',
  description:
    'List all snippets. Lists all snippets available to the currently authenticated user. Users with Administrator or Auditor access levels can see all snippets (both personal and project). This feature was introduced in GitLab 16.3.',
  input: {
    type: 'object',
    properties: {
      created_after: {
        type: 'string',
        description: 'Return snippets created on or after the specified time.',
      },
      created_before: {
        type: 'string',
        description: 'Return snippets created on or before the specified time.',
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
      repository_storage: {
        type: 'string',
        description: 'Filter by repository storage used by the snippet. Administrators only.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/snippets/all',
    query: ['created_after', 'created_before', 'page', 'per_page', 'repository_storage'],
  },
});
