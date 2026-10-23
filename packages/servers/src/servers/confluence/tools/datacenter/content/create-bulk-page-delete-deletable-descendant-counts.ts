import { defineTool } from "@usemcpkit/core";

export const datacenterContentCreateBulkPageDeleteDeletableDescendantCounts = defineTool({
  name: "datacenter:content:create_bulk_page_delete_deletable_descendant_counts",
  description:
    "[Data Center] Count deletable descendants. Returns the number of descendant pages that the current user can delete for each of the specified pages.",
  input: {
    type: "object",
    properties: {
      pageIds: {
        type: "array",
        items: {
          type: "integer",
        },
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/content/bulk/page/delete/deletableDescendantCounts",
    body: ["pageIds"],
  },
});
