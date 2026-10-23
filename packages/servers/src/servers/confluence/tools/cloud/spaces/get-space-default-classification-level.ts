import { defineTool } from "@usemcpkit/core";

export const cloudSpacesGetSpaceDefaultClassificationLevel = defineTool({
  name: "cloud:spaces:get_space_default_classification_level",
  description:
    "[Cloud] Get space default classification level. Returns the default classification level for a specific space.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the space for which default classification level should be returned.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/spaces/{id}/classification-level/default",
  },
});
