import { defineTool } from "@usemcpkit/core";

export const datacenterContentCreateBulkPageDelete = defineTool({
  name: "datacenter:content:create_bulk_page_delete",
  description:
    "[Data Center] Bulk delete pages. Triggers a bulk delete operation on the specified pages. Each entry specifies a page to delete and whether all descendant pages should also be deleted. When deleteAllDescendants is true, the entire page subtree is trashed (except excludedIds if present). When false, only the specified page is trashed and its children are re-parented. Returns a long-running task that can be monitored for progress.",
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
    path: "/rest/api/content/bulk/page/delete",
    bodyArg: "body",
  },
});
