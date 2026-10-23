import { defineTool } from '@usemcpkit/core';

export const projectsProjectsJobTokenScopeCreateProjectsJobTokenScopeGroupsAllowlist = defineTool({
  name: 'projects:projects_job_token_scope:create_projects_job_token_scope_groups_allowlist',
  description:
    'Add a group to a CI/CD job token allowlist. Adds a group to the CI/CD job token allowlist of a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the project.',
      },
      target_group_id: {
        type: 'integer',
        description: 'ID of the group to add to the CI/CD job token groups allowlist.',
      },
    },
    required: ['id', 'target_group_id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/job_token_scope/groups_allowlist',
    body: ['target_group_id'],
  },
});
