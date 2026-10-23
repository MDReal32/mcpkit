import { defineTool } from '@usemcpkit/core';

export const classroomListAcceptedAssignmentsForAnAssignment = defineTool({
  name: 'classroom:list_accepted_assignments_for_an_assignment',
  description:
    '[Deprecated] Closed - List accepted assignments for an assignment. > [!WARNING] > **Closed notice:** This operation is no longer available as of August 28, 2026. > For more information, see the GitHub Classroom sunset notice.',
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
    path: '/assignments/{assignment_id}/accepted_assignments',
  },
});
