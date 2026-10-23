import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceDeleteCategory = defineTool({
  name: "datacenter:space:delete_category",
  description: "[Data Center] Remove a category from a space. Removes a category from a space, identified by spaceKey.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "The key of the space to remove the category from",
      },
      categoryName: {
        type: "string",
        description: "The name of the category to remove",
      },
    },
    required: ["spaceKey", "categoryName"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/space/{spaceKey}/category/{categoryName}",
  },
});
