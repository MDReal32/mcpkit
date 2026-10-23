import { defineTool } from '@usemcpkit/core';

export const packagesPackagesGetProjectsPackagesPackageFilesDownload = defineTool({
  name: 'packages:packages:get_projects_packages_package_files_download',
  description: 'Download a package file. This feature was introduced in GitLab 18.4',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      package_id: {
        type: 'integer',
        description: 'ID of the package.',
      },
      package_file_id: {
        type: 'integer',
        description: 'ID of the package file.',
      },
      download_mode: {
        type: 'string',
        enum: ['proxy', 'direct'],
        description:
          'Requested download transfer mode (`proxy` or `direct`). Only honored when allowed by the object storage configuration.',
      },
    },
    required: ['id', 'package_id', 'package_file_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/packages/{package_id}/package_files/{package_file_id}/download',
    query: ['download_mode'],
  },
});
