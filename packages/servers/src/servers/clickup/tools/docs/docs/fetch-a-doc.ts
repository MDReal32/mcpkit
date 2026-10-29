import { defineTool } from "@usemcpkit/core";

export const docsDocsFetchADoc = defineTool({
  name: "docs:docs:fetch_a_doc",
  description: "Fetch a Doc. View information about a Doc.",
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
    },
    required: ["workspace_id", "doc_id"],
  },
  request: {
    method: "GET",
    path: "/v3/workspaces/{workspace_id}/docs/{doc_id}",
  },
});
