import { defineTool } from "@usemcpkit/core";

export const docsDocsGetPage = defineTool({
  name: "docs:docs:get_page",
  description:
    "Get page. View the information about a page in a Doc. Due to markdown format limitations, some content elements will not be displayed exactly as they appear in ClickUp.",
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
      page_id: {
        type: "string",
        description: "The ID of the page",
      },
      content_format: {
        type: "string",
        default: "text/md",
        enum: ["text/md", "text/plain"],
        description:
          "The format to return the page content in. For example, `text/md` for markdown or `text/plain` for plain text.",
      },
    },
    required: ["workspace_id", "doc_id", "page_id"],
  },
  request: {
    method: "GET",
    path: "/v3/workspaces/{workspace_id}/docs/{doc_id}/pages/{page_id}",
    query: ["content_format"],
  },
});
