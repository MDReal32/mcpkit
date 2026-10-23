import { defineTool } from '@usemcpkit/core';

export const securitySoftwareCompositionAnalysisCreateJobsSbomScansAuthorize = defineTool({
  name: 'security:software_composition_analysis:create_jobs_sbom_scans_authorize',
  description: 'Authorize SBOM file upload. Authorizes uploading an SBOM file to be scanned for a specified job.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the job.',
      },
      filesize: {
        type: 'integer',
        description: 'Size of the artifact file.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/jobs/{id}/sbom_scans/authorize',
    body: ['filesize'],
  },
});
