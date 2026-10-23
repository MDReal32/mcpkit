import { defineTool } from '@usemcpkit/core';

export const securityDependencyGraphFetchSbomReport = defineTool({
  name: 'security:dependency_graph:fetch_sbom_report',
  description:
    'Fetch a software bill of materials (SBOM) for a repository. Fetches a previously generated software bill of materials (SBOM) for a repository. When the SBOM is ready, the response is a 302 redirect to a temporary download URL for the SBOM in SPDX JSON format. The generated SBOM report may be retained for up to one week from the original request. The temporary download URL returned by this endpoint expires separately, and its expiry is set when the fetch r…',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      sbom_uuid: {
        type: 'string',
        description: 'The unique identifier of the SBOM export.',
      },
    },
    required: ['owner', 'repo', 'sbom_uuid'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/dependency-graph/sbom/fetch-report/{sbom_uuid}',
  },
});
