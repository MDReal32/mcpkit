import { defineTool } from '@usemcpkit/core';

export const orgsClassroomGetAClassroom = defineTool({
  name: 'orgs:classroom:get_a_classroom',
  description:
    '[Deprecated] Closed - Get a classroom. > [!WARNING] > **Closed notice:** This operation is no longer available as of August 28, 2026. > For more information, see the GitHub Classroom sunset notice.',
  input: {
    type: 'object',
    properties: {
      classroom_id: {
        type: 'integer',
        description: 'The unique identifier of the classroom.',
      },
    },
    required: ['classroom_id'],
  },
  request: {
    method: 'GET',
    path: '/classrooms/{classroom_id}',
  },
});
