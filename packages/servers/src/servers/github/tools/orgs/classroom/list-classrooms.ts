import { defineTool } from "@usemcpkit/core";

export const orgsClassroomListClassrooms = defineTool({
  name: "orgs:classroom:list_classrooms",
  description:
    "[Deprecated] Closed - List classrooms. > [!WARNING] > **Closed notice:** This operation is no longer available as of August 28, 2026. > For more information, see the GitHub Classroom sunset notice.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/classrooms",
  },
});
