import { defineTool } from "@usemcpkit/core";

export const projectsProjectComponentsDeleteComponent = defineTool({
  name: "projects:project_components:delete_component",
  description: "Delete component. Deletes a component.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the component.",
      },
      moveIssuesTo: {
        type: "string",
        description:
          "The ID of the component to replace the deleted component. If this value is null no replacement is made.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/component/{id}",
    query: ["moveIssuesTo"],
  },
});
