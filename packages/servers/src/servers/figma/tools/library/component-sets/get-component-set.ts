import { defineTool } from "@usemcpkit/core";

export const libraryComponentSetsGetComponentSet = defineTool({
  name: "library:component_sets:get_component_set",
  description: "Get component set. Get metadata on a published component set by key.",
  input: {
    type: "object",
    properties: {
      key: {
        type: "string",
        description: "The unique identifier of the component set.",
      },
    },
    required: ["key"],
  },
  request: {
    method: "GET",
    path: "/v1/component_sets/{key}",
  },
});
