import { defineTool } from "@usemcpkit/core";

export const projectsProjectComponentsGetComponent = defineTool({
  name: "projects:project_components:get_component",
  description: "Get component. Returns a component.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the component.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/component/{id}",
  },
});
