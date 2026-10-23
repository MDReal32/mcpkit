import { defineTool } from '@usemcpkit/core';

export const classroomGetAssignmentGrades = defineTool({
  name: 'classroom:get_assignment_grades',
  description:
    '[Deprecated] Closed - Get assignment grades. > [!WARNING] > **Closed notice:** This operation is no longer available as of August 28, 2026. > For more information, see the GitHub Classroom sunset notice.',
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
    path: '/assignments/{assignment_id}/grades',
  },
});
