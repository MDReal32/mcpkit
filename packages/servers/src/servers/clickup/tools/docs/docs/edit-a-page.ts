import { defineTool } from "@usemcpkit/core";

export const docsDocsEditAPage = defineTool({
  name: "docs:docs:edit_a_page",
  description: "Edit a Page. Edit a page in a Doc.",
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
      name: {
        type: "string",
        description: "The updated name of the page.",
        default: "",
      },
      sub_title: {
        type: "string",
        description: "The updateds ubtitle of the page.",
      },
      content: {
        type: "string",
        description: "The updated content of the page.",
        default: "",
      },
      content_edit_mode: {
        type: "string",
        description: "The strategy for updating content on the page. For example, `replace`, `append`, or `prepend`.",
        default: "replace",
        enum: ["replace", "append", "prepend"],
      },
      content_format: {
        type: "string",
        description:
          "The format the page content is in. For example, `text/md` for markdown or `text/plain` for plain text.",
        default: "text/md",
        enum: ["text/md", "text/plain"],
      },
    },
    required: ["workspace_id", "doc_id", "page_id"],
  },
  request: {
    method: "PUT",
    path: "/v3/workspaces/{workspace_id}/docs/{doc_id}/pages/{page_id}",
    body: ["name", "sub_title", "content", "content_edit_mode", "content_format"],
  },
});
