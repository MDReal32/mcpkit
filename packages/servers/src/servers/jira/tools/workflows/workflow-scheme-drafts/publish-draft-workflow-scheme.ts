import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowSchemeDraftsPublishDraftWorkflowScheme = defineTool({
  name: 'workflows:workflow_scheme_drafts:publish_draft_workflow_scheme',
  description: 'Publish draft workflow scheme. Publishes a draft workflow scheme.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the workflow scheme that the draft belongs to.',
      },
      validateOnly: {
        type: 'boolean',
        default: false,
        description: 'Whether the request only performs a validation.',
      },
      statusMappings: {
        type: 'array',
        description: 'Mappings of statuses to new statuses for issue types.',
        items: {
          type: 'object',
          description: 'Details about the mapping from a status to a new status for an issue type.',
          properties: {
            issueTypeId: {
              type: 'string',
              description: 'The ID of the issue type.',
            },
            newStatusId: {
              type: 'string',
              description: 'The ID of the new status.',
            },
            statusId: {
              type: 'string',
              description: 'The ID of the status.',
            },
          },
          required: ['issueTypeId', 'newStatusId', 'statusId'],
        },
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/workflowscheme/{id}/draft/publish',
    query: ['validateOnly'],
    body: ['statusMappings'],
  },
});
