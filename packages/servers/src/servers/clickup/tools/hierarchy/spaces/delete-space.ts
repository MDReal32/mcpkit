import { defineTool } from "@usemcpkit/core";

export const hierarchySpacesDeleteSpace = defineTool({
  name: "hierarchy:spaces:delete_space",
  description: "Delete Space. Delete a Space from your Workspace.",
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
    method: "DELETE",
    path: "/v2/space/{space_id}",
  },
});
