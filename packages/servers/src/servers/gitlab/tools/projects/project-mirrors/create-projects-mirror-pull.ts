import { defineTool } from '@usemcpkit/core';

export const projectsProjectMirrorsCreateProjectsMirrorPull = defineTool({
  name: 'projects:project_mirrors:create_projects_mirror_pull',
  description:
    'Start the pull mirroring process for a project. Starts the pull mirroring process for a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      action: {
        type: 'string',
        description: 'Action of the GitHub pull request event.',
      },
      pull_request_number: {
        type: 'integer',
        description: 'Pull request IID',
      },
      pull_request_head_ref: {
        type: 'string',
        description: 'Source branch',
      },
      pull_request_head_sha: {
        type: 'string',
        description: 'Source sha',
      },
      pull_request_head_repo_full_name: {
        type: 'string',
        description: 'Source repository',
      },
      pull_request_base_ref: {
        type: 'string',
        description: 'Target branch',
      },
      pull_request_base_sha: {
        type: 'string',
        description: 'Target sha',
      },
      pull_request_base_repo_full_name: {
        type: 'string',
        description: 'Target repository',
      },
      force: {
        type: 'boolean',
        description:
          'If `true`, resets a hard-failed mirror and retries the update. Ignored for requests authenticated with a GitHub webhook signature.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/mirror/pull',
    body: {
      action: 'action',
      'pull_request.number': 'pull_request_number',
      'pull_request.head.ref': 'pull_request_head_ref',
      'pull_request.head.sha': 'pull_request_head_sha',
      'pull_request.head.repo.full_name': 'pull_request_head_repo_full_name',
      'pull_request.base.ref': 'pull_request_base_ref',
      'pull_request.base.sha': 'pull_request_base_sha',
      'pull_request.base.repo.full_name': 'pull_request_base_repo_full_name',
      force: 'force',
    },
  },
});
