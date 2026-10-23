import { defineTool } from '@usemcpkit/core';

export const projectsCommitStatusesCreateProjectsStatuses = defineTool({
  name: 'projects:commit_statuses:create_projects_statuses',
  description:
    'Create or update a commit pipeline status. Creates or updates the status of a commit represented by a job in an `external` stage. If the commit is associated with a merge request, target the commit in the merge request source branch.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      sha: {
        type: 'string',
        description: 'Commit SHA.',
      },
      state: {
        type: 'string',
        description: 'State of the status.',
        enum: ['pending', 'running', 'success', 'failed', 'canceled', 'skipped'],
      },
      ref: {
        type: 'string',
        description: 'Branch or tag that the status refers to. Must be 255 characters or fewer.',
      },
      target_url: {
        type: 'string',
        description: 'Target URL to associate with this status. Must be 255 characters or fewer.',
      },
      description: {
        type: 'string',
        description: 'Short description of the status. Must be 255 characters or fewer.',
      },
      name: {
        type: 'string',
        description: 'String label to differentiate this status from the status of other systems.',
      },
      context: {
        type: 'string',
        description: 'String label to differentiate this status from the status of other systems.',
      },
      coverage: {
        type: 'number',
        description: 'Total code coverage.',
      },
      pipeline_id: {
        type: 'integer',
        description:
          'ID of the pipeline to set the status for. Use when multiple pipelines exist for the same commit SHA.',
      },
    },
    required: ['id', 'sha', 'state'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/statuses/{sha}',
    body: ['state', 'ref', 'target_url', 'description', 'name', 'context', 'coverage', 'pipeline_id'],
  },
});
