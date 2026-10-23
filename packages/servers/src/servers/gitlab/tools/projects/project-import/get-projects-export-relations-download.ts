import { defineTool } from '@usemcpkit/core';

export const projectsProjectImportGetProjectsExportRelationsDownload = defineTool({
  name: 'projects:project_import:get_projects_export_relations_download',
  description: 'Download a relations export for a project. Downloads a project relations export file.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      relation: {
        type: 'string',
        description: 'Name of the project top-level relation to download or view.',
      },
      batched: {
        type: 'boolean',
        description:
          'If `true`, downloads the batch specified by `batch_number`. Set to `true` only for batched exports. All or none of `batched`, `batch_number` must be provided.',
      },
      batch_number: {
        type: 'integer',
        description:
          'Number of the export batch to download. All or none of `batched`, `batch_number` must be provided.',
      },
    },
    required: ['id', 'relation'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/export_relations/download',
    query: ['relation', 'batched', 'batch_number'],
  },
});
