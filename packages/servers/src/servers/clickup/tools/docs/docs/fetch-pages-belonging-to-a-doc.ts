import { defineTool } from "@usemcpkit/core";

export const docsDocsFetchPagesBelongingToADoc = defineTool({
  name: "docs:docs:fetch_pages_belonging_to_a_doc",
  description: "Fetch Pages belonging to a Doc. View the pages belonging to a Doc.",
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
      content_format: {
        type: "string",
        default: "text/md",
        enum: ["text/md", "text/plain"],
        description:
          "The format to return the page content in. For example, `text/md` for markdown or `text/plain` for plain text.",
      },
    },
    required: ["workspace_id", "doc_id"],
  },
  request: {
    method: "GET",
    path: "/v3/workspaces/{workspace_id}/docs/{doc_id}/pages",
    query: ["max_page_depth", "content_format"],
  },
});
