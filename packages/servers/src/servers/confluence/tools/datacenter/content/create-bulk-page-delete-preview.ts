import { defineTool } from "@usemcpkit/core";

export const datacenterContentCreateBulkPageDeletePreview = defineTool({
  name: "datacenter:content:create_bulk_page_delete_preview",
  description:
    "[Data Center] Preview bulk delete. Previews a bulk delete operation without actually deleting any pages. Returns counts of how many pages the current user can delete vs. how many will be 'left behind' (re-parented) due to permission restrictions.",
  input: {
    type: "object",
    properties: {
      body: {
        type: "array",
        items: {
          type: "object",
          properties: {
            contentId: {
              type: "string",
            },
            deleteAllDescendants: {
              type: "boolean",
            },
            excludedDescendantIds: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/content/bulk/page/delete/preview",
    bodyArg: "body",
  },
});
