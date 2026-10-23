import { defineTool } from '@usemcpkit/core';

export const securitySoftwareCompositionAnalysisCreateJobsSbomScans = defineTool({
  name: 'security:software_composition_analysis:create_jobs_sbom_scans',
  description:
    'Reuse SBOM scan results. Reuses existing SBOM scan results if scans for the specified digest already exist.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the job.',
      },
      sbom_digest: {
        type: 'string',
        description: 'SBOM digest that identifies an SBOM scan uniquely.',
      },
      purl_types: {
        type: 'array',
        description: 'List of package URL (purl) types valid for the given SBOM digest.',
      },
    },
    required: ['id', 'sbom_digest', 'purl_types'],
  },
  request: {
    method: 'POST',
    path: '/jobs/{id}/sbom_scans/{sbom_digest}',
    body: ['purl_types'],
  },
});
