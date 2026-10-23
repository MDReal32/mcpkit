import { defineTool } from "@usemcpkit/core";

export const projectsImportsCreateBulkImportsCancel = defineTool({
  name: "projects:imports:create_bulk_imports_cancel",
  description: "Cancel a migration. Cancels a direct transfer migration. This feature was introduced in GitLab 17.1.",
  input: {
    type: "object",
    properties: {
      import_id: {
        type: "integer",
        description: "ID of the GitLab Migration.",
      },
    },
    required: ["import_id"],
  },
  request: {
    method: "POST",
    path: "/bulk_imports/{import_id}/cancel",
  },
});
