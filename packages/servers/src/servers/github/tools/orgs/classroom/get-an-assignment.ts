import { defineTool } from '@usemcpkit/core';

export const orgsClassroomGetAnAssignment = defineTool({
  name: 'orgs:classroom:get_an_assignment',
  description:
    '[Deprecated] Closed - Get an assignment. > [!WARNING] > **Closed notice:** This operation is no longer available as of August 28, 2026. > For more information, see the GitHub Classroom sunset notice.',
  input: {
    type: 'object',
    properties: {
      assignment_id: {
        type: 'integer',
        description: 'The unique identifier of the classroom assignment.',
      },
    },
    required: ['assignment_id'],
  },
  request: {
    method: 'GET',
    path: '/assignments/{assignment_id}',
  },
});
