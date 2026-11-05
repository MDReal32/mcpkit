import { defineTool } from "@usemcpkit/core";

export const workflowsTagsUpdateTag = defineTool({
  name: "workflows:tags:update_tag",
  description: "Update a tag. Update a tag.",
  input: {
    type: "object",
    properties: {
      tagId: {
        type: "string",
        description: "The ID of the tag.",
      },
      id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      createdAt: {
        type: "string",
      },
      updatedAt: {
        type: "string",
      },
    },
    required: ["tagId", "name"],
  },
  request: {
    method: "PUT",
    path: "/tags/{tagId}",
    body: ["id", "name", "createdAt", "updatedAt"],
  },
});
