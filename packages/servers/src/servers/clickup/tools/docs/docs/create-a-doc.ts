import { defineTool } from "@usemcpkit/core";

export const docsDocsCreateADoc = defineTool({
  name: "docs:docs:create_a_doc",
  description: "Create a Doc. Create a new Doc.",
  input: {
    type: "object",
    properties: {
      workspace_id: {
        type: "number",
        description: "The ID of the Workspace.",
      },
      name: {
        type: "string",
        description: "The name of the new Doc.",
        default: "",
      },
      parent: {
        type: "object",
        description: "The parent of the new Doc.",
        properties: {
          id: {
            type: "string",
          },
          type: {
            type: "number",
            description:
              "The parent Doc type. Use `4` for Space, `5` for Folder, `6` for List, `7` for Everything, and `12` for Workspace.",
          },
        },
        required: ["id", "type"],
      },
      visibility: {
        description: "The visibility of the new Doc. For example, `PUBLIC` or `PRIVATE`.",
      },
      create_page: {
        type: "boolean",
        description: "Create a new page when creating the Doc.",
        default: true,
      },
    },
    required: ["workspace_id"],
  },
  request: {
    method: "POST",
    path: "/v3/workspaces/{workspace_id}/docs",
    body: ["name", "parent", "visibility", "create_page"],
  },
});
