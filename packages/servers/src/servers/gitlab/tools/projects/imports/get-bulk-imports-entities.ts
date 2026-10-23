import { defineTool } from '@usemcpkit/core';

export const projectsImportsGetBulkImportsEntities = defineTool({
  name: 'projects:imports:get_bulk_imports_entities',
  description:
    'Retrieve a group or project migration entity. Retrieves details of a group or project migration entity.',
  input: {
    type: 'object',
    properties: {
      import_id: {
        type: 'integer',
        description: 'ID of the GitLab Migration.',
      },
      entity_id: {
        type: 'integer',
        description: 'ID of the GitLab Migration entity.',
      },
    },
    required: ['import_id', 'entity_id'],
  },
  request: {
    method: 'GET',
    path: '/bulk_imports/{import_id}/entities/{entity_id}',
  },
});
