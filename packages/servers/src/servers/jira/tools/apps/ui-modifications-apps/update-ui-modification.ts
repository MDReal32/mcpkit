import { defineTool } from '@usemcpkit/core';

export const appsUiModificationsAppsUpdateUiModification = defineTool({
  name: 'apps:ui_modifications_apps:update_ui_modification',
  description: 'Update UI modification. Updates a UI modification. UI modification can only be updated by Forge apps.',
  input: {
    type: 'object',
    properties: {
      uiModificationId: {
        type: 'string',
        description: 'The ID of the UI modification.',
      },
      contexts: {
        type: 'array',
        description:
          'List of contexts of the UI modification. The maximum number of contexts is 1000. If provided, replaces all existing contexts.',
        items: {
          type: 'object',
          description:
            "The details of a UI modification's context, which define where to activate the UI modification.",
          properties: {
            id: {
              type: 'string',
              description: 'The ID of the UI modification context.',
            },
            isAvailable: {
              type: 'boolean',
              description:
                'Whether a context is available. For example, when a project is deleted the context becomes unavailable.',
            },
            issueTypeId: {
              type: 'string',
              description:
                'The issue type ID of the context. Null is treated as a wildcard, meaning the UI modification will be applied to all issue types. Each UI modification context can have a maximum of one wildcard.',
            },
            portalId: {
              type: 'string',
              description:
                'The portal ID of the context. Only required for Jira Service Management request create portal view (`JSMRequestCreate`).',
            },
            projectId: {
              type: 'string',
              description:
                'The project ID of the context. Null is treated as a wildcard, meaning the UI modification will be applied to all projects. Each UI modification context can have a maximum of one wildcard.',
            },
            requestTypeId: {
              type: 'string',
              description:
                'The request type ID of the context. Required for Jira Service Management request create portal view (`JSMRequestCreate`). Optional for Agent view types (`GICAgentView`, `IssueViewAgentView`, `IssueTransitionAgentView`): when set on an agent view context, the UI modification applies only to issues with that request type. Omitting `requestTypeId` does not create a wildcard — it means the context is…',
            },
            viewType: {
              type: 'string',
              description: 'The view type of the context. Supported values:',
              enum: [
                'GIC',
                'IssueView',
                'IssueTransition',
                'JSMRequestCreate',
                'GICAgentView',
                'IssueViewAgentView',
                'IssueTransitionAgentView',
              ],
            },
          },
        },
      },
      data: {
        type: 'string',
        description: 'The data of the UI modification. The maximum size of the data is 50000 characters.',
      },
      description: {
        type: 'string',
        description: 'The description of the UI modification. The maximum length is 255 characters.',
      },
      name: {
        type: 'string',
        description: 'The name of the UI modification. The maximum length is 255 characters.',
      },
    },
    required: ['uiModificationId'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/uiModifications/{uiModificationId}',
    body: ['contexts', 'data', 'description', 'name'],
  },
});
