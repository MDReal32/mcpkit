import { defineTool } from '@usemcpkit/core';

export const reposReposCreatePagesDeployment = defineTool({
  name: 'repos:repos:create_pages_deployment',
  description: 'Create a GitHub Pages deployment. Create a GitHub Pages deployment for a repository.',
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
      artifact_id: {
        type: 'number',
        description:
          'The ID of an artifact that contains the .zip or .tar of static assets to deploy. The artifact belongs to the repository. Either `artifact_id` or `artifact_url` are required.',
      },
      artifact_url: {
        type: 'string',
        description:
          'The URL of an artifact that contains the .zip or .tar of static assets to deploy. The artifact belongs to the repository. Either `artifact_id` or `artifact_url` are required.',
      },
      environment: {
        type: 'string',
        description: 'The target environment for this GitHub Pages deployment.',
        default: 'github-pages',
      },
      pages_build_version: {
        type: 'string',
        description: 'A unique string that represents the version of the build for this deployment.',
        default: 'GITHUB_SHA',
      },
      oidc_token: {
        type: 'string',
        description: 'The OIDC token issued by GitHub Actions certifying the origin of the deployment.',
      },
    },
    required: ['owner', 'repo', 'pages_build_version', 'oidc_token'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/pages/deployments',
    body: ['artifact_id', 'artifact_url', 'environment', 'pages_build_version', 'oidc_token'],
  },
});
