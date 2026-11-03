import { defineTool } from "@usemcpkit/core";

export const libraryComponentsGetComponent = defineTool({
  name: "library:components:get_component",
  description: "Get component. Get metadata on a component by key.",
  input: {
    type: "object",
    properties: {
      key: {
        type: "string",
        description: "The unique identifier of the component.",
      },
    },
    required: ["key"],
  },
  request: {
    method: "GET",
    path: "/v1/components/{key}",
  },
});
