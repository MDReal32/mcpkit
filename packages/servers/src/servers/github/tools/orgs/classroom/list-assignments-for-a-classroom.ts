import { defineTool } from "@usemcpkit/core";

export const orgsClassroomListAssignmentsForAClassroom = defineTool({
  name: "orgs:classroom:list_assignments_for_a_classroom",
  description:
    "[Deprecated] Closed - List assignments for a classroom. > [!WARNING] > **Closed notice:** This operation is no longer available as of August 28, 2026. > For more information, see the GitHub Classroom sunset notice.",
  input: {
    type: "object",
    properties: {
      classroom_id: {
        type: "integer",
        description: "The unique identifier of the classroom.",
      },
    },
    required: ["classroom_id"],
  },
  request: {
    method: "GET",
    path: "/classrooms/{classroom_id}/assignments",
  },
});
