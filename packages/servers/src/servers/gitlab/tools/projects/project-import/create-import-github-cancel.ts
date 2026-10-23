import { defineTool } from '@usemcpkit/core';

export const projectsProjectImportCreateImportGithubCancel = defineTool({
  name: 'projects:project_import:create_import_github_cancel',
  description: 'Cancel a GitHub project import. Cancels an in-progress import of a GitHub project to GitLab.',
  input: {
    type: 'object',
    properties: {
      project_id: {
        type: 'integer',
        description: 'ID of the project whose import to cancel.',
      },
    },
    required: ['project_id'],
  },
  request: {
    method: 'POST',
    path: '/import/github/cancel',
    body: ['project_id'],
  },
});
