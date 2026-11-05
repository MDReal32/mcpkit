import { defineTool } from "@usemcpkit/core";

export const workflowsTagsCreateTag = defineTool({
  name: "workflows:tags:create_tag",
  description: "Create a tag. Create a tag in your instance.",
  input: {
    type: "object",
    properties: {
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
    required: ["name"],
  },
  request: {
    method: "POST",
    path: "/tags",
    body: ["id", "name", "createdAt", "updatedAt"],
  },
});
