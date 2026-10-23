import { defineTool } from "@usemcpkit/core";

export const cloudSpacesDeleteSpaceDefaultClassificationLevel = defineTool({
  name: "cloud:spaces:delete_space_default_classification_level",
  description:
    "[Cloud] Delete space default classification level. Returns the default classification level for a specific space.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the space for which default classification level should be deleted.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/api/v2/spaces/{id}/classification-level/default",
  },
});
