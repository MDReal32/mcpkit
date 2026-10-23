import { defineTool } from '@usemcpkit/core';

export const projectsProjectImportCreateProjectsExport = defineTool({
  name: 'projects:project_import:create_projects_export',
  description:
    'Export a project. Exports a project. Use the `upload` hash parameter to upload the exported project to a web server or any S3-compatible platform.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      description: {
        type: 'string',
        description: 'Overrides the project description.',
      },
      upload: {
        type: 'object',
        description: 'Details for uploading the exported project to a web server.',
        properties: {
          url: {
            type: 'string',
            description: 'URL to upload the exported project to.',
          },
          http_method: {
            type: 'string',
            description: 'HTTP method to upload the exported project.',
            default: 'PUT',
            enum: ['PUT', 'POST'],
          },
        },
      },
      excluded_relations: {
        type: 'array',
        description:
          'Project relation names to exclude from the export, for example `merge_requests`, `issues`, `ci_pipelines`, `uploads`, and `lfs_objects`.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/export',
    body: ['description', 'upload', 'excluded_relations'],
  },
});
