import { defineTool } from '@usemcpkit/core';

export const cloudSpacePermissionsGetSpacePermissionTransitionTaskStatus = defineTool({
  name: 'cloud:space_permissions:get_space_permission_transition_task_status',
  description:
    '[Cloud] Get space permission transition task status. Retrieves the status of an async space permission transition task. Use the taskId returned from the generate-combinations, assign-roles, or remove-access endpoints to poll for progress and completion.',
  input: {
    type: 'object',
    properties: {
      taskId: {
        type: 'string',
        description:
          'The ID of the async task, as returned by the generate-combinations, assign-roles, or remove-access endpoints.',
      },
    },
    required: ['taskId'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/space-permissions/transition/tasks/{taskId}',
  },
});
