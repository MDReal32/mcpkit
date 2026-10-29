import { defineTool } from "@usemcpkit/core";

export const docsDocsFetchPagelistingForADoc = defineTool({
  name: "docs:docs:fetch_pagelisting_for_a_doc",
  description: "Fetch PageListing for a Doc. View the PageListing for a Doc.",
  input: {
    type: "object",
    properties: {
      workspace_id: {
        type: "number",
        description: "The ID of the Workspace.",
      },
      doc_id: {
        type: "string",
        description: "The ID of the doc.",
      },
      max_page_depth: {
        type: "number",
        default: -1,
        description:
          "The maximum depth to retrieve pages and subpages. Use `-1` to return pages and subpages with no depth limit.",
      },
    },
    required: ["workspace_id", "doc_id"],
  },
  request: {
    method: "GET",
    path: "/v3/workspaces/{workspace_id}/docs/{doc_id}/page_listing",
    query: ["max_page_depth"],
  },
});
