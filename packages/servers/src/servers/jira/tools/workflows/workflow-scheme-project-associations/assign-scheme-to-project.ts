import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowSchemeProjectAssociationsAssignSchemeToProject = defineTool({
  name: 'workflows:workflow_scheme_project_associations:assign_scheme_to_project',
  description:
    'Assign workflow scheme to project. Assigns a workflow scheme to a project. This operation is performed only when there are no issues in the project.',
  input: {
    type: 'object',
    properties: {
      projectId: {
        type: 'string',
        description: 'The ID of the project.',
      },
      workflowSchemeId: {
        type: 'string',
        description:
          'The ID of the workflow scheme. If the workflow scheme ID is `null`, the operation assigns the default workflow scheme.',
      },
    },
    required: ['projectId'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/workflowscheme/project',
    body: ['projectId', 'workflowSchemeId'],
  },
});
