import { defineTool } from "@usemcpkit/core";

export const docsDocsCreateAPage = defineTool({
  name: "docs:docs:create_a_page",
  description: "Create a Page. Create a page in a Doc.",
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
      parent_page_id: {
        type: "string",
        description:
          "The ID of the parent page. If this is a root page in the Doc, `parent_page_id` will not be returned.",
      },
      name: {
        type: "string",
        description: "The name of the new page.",
        default: "",
      },
      sub_title: {
        type: "string",
        description: "The subtitle of the new page.",
      },
      content: {
        type: "string",
        description: "The content of the new page.",
        default: "",
      },
      content_format: {
        type: "string",
        description:
          "The format the page content is in. For example, `text/md` for markdown or `text/plain` for plain text.",
        default: "text/md",
        enum: ["text/md", "text/plain"],
      },
    },
    required: ["workspace_id", "doc_id"],
  },
  request: {
    method: "POST",
    path: "/v3/workspaces/{workspace_id}/docs/{doc_id}/pages",
    body: ["parent_page_id", "name", "sub_title", "content", "content_format"],
  },
});
