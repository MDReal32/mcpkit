import { defineTool } from "@usemcpkit/core";

export const workflowsTagsGetTag = defineTool({
  name: "workflows:tags:get_tag",
  description: "Retrieves a tag. Retrieves a tag.",
  input: {
    type: "object",
    properties: {
      tagId: {
        type: "string",
        description: "The ID of the tag.",
      },
    },
    required: ["tagId"],
  },
  request: {
    method: "GET",
    path: "/tags/{tagId}",
  },
});
