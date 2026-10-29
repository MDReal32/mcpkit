import { defineTool } from "@usemcpkit/core";

export const hierarchySpacesGetSpace = defineTool({
  name: "hierarchy:spaces:get_space",
  description: "Get Space. View the Spaces available in a Workspace.",
  input: {
    type: "object",
    properties: {
      space_id: {
        type: "number",
      },
    },
    required: ["space_id"],
  },
  request: {
    method: "GET",
    path: "/v2/space/{space_id}",
  },
});
