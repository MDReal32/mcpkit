import { defineTool } from '@usemcpkit/core';

export const packagesMlModelRegistryUpdateProjectsPackagesMlModelsFilesAuthorize = defineTool({
  name: 'packages:ml_model_registry:update_projects_packages_ml_models_files_authorize',
  description: 'Workhorse authorize model package file. Introduced in GitLab 16.8',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID or URL-encoded path of the project',
      },
      file_name: {
        type: 'string',
        description: 'File name',
      },
      model_version_id: {
        type: 'string',
        description: 'Model version id',
      },
      status: {
        type: 'string',
        description: 'Package status',
        enum: ['default', 'hidden'],
      },
    },
    required: ['id', 'file_name', 'model_version_id'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/packages/ml_models/{model_version_id}/files/{file_name}/authorize',
    body: ['status'],
  },
});
