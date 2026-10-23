import { defineTool } from "@usemcpkit/core";

export const cloudPagesDeletePage = defineTool({
  name: "cloud:pages:delete_page",
  description: "[Cloud] Delete page. Delete a page by id.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the page to be deleted.",
      },
      purge: {
        type: "boolean",
        description: "If attempting to purge the page.",
      },
      draft: {
        type: "boolean",
        description: "If attempting to delete a page that is a draft.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/api/v2/pages/{id}",
    query: ["purge", "draft"],
  },
});
