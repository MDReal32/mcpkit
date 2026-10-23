import { defineTool } from "@usemcpkit/core";

export const projectsImportsListBulkImportsEntitiesGet = defineTool({
  name: "projects:imports:list_bulk_imports_entities_get",
  description:
    "List all group or project migration entities. Lists all group or project migration entities for a specified migration.",
  input: {
    type: "object",
    properties: {
      import_id: {
        type: "integer",
        description: "ID of the GitLab Migration.",
      },
      status: {
        type: "string",
        enum: ["created", "started", "finished", "timeout", "failed", "canceled"],
        description: "Filter entities by import status.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
    required: ["import_id"],
  },
  request: {
    method: "GET",
    path: "/bulk_imports/{import_id}/entities",
    query: ["status", "page", "per_page"],
  },
});
