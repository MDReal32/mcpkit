import { defineTool } from "@usemcpkit/core";

export const libraryStylesGetStyle = defineTool({
  name: "library:styles:get_style",
  description: "Get style. Get metadata on a style by key.",
  input: {
    type: "object",
    properties: {
      key: {
        type: "string",
        description: "The unique identifier of the style.",
      },
    },
    required: ["key"],
  },
  request: {
    method: "GET",
    path: "/v1/styles/{key}",
  },
});
