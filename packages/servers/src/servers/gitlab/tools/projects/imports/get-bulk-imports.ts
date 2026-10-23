import { defineTool } from "@usemcpkit/core";

export const projectsImportsGetBulkImports = defineTool({
  name: "projects:imports:get_bulk_imports",
  description: "Retrieve a group or project migration. Retrieves details of a group or project migration.",
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
    method: "GET",
    path: "/bulk_imports/{import_id}",
  },
});
