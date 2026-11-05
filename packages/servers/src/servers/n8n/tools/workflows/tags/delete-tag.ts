import { defineTool } from "@usemcpkit/core";

export const workflowsTagsDeleteTag = defineTool({
  name: "workflows:tags:delete_tag",
  description: "Delete a tag. Deletes a tag.",
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
    method: "DELETE",
    path: "/tags/{tagId}",
  },
});
