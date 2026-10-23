import { defineTool } from '@usemcpkit/core';

export const adminGeoListGeoRepositoriesPipelineRefs = defineTool({
  name: 'admin:geo:list_geo_repositories_pipeline_refs',
  description:
    'List all pipeline refs for a project. Lists all pipeline refs for a project. Secondary runners use them to check the site is up to date.',
  input: {
    type: 'object',
    properties: {
      gl_repository: {
        type: 'string',
        description: 'Repository to check.',
      },
    },
    required: ['gl_repository'],
  },
  request: {
    method: 'GET',
    path: '/geo/repositories/{gl_repository}/pipeline_refs',
  },
});
