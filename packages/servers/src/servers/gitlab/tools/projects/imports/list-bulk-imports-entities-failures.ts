import { defineTool } from "@usemcpkit/core";

export const projectsImportsListBulkImportsEntitiesFailures = defineTool({
  name: "projects:imports:list_bulk_imports_entities_failures",
  description:
    "List all failed import records for a migration entity. Lists all failed import records for a group or project migration entity. This feature was introduced in GitLab 16.6.",
  input: {
    type: "object",
    properties: {
      import_id: {
        type: "integer",
        description: "ID of the GitLab Migration.",
      },
      entity_id: {
        type: "integer",
        description: "ID of the GitLab Migration entity.",
      },
    },
    required: ["import_id", "entity_id"],
  },
  request: {
    method: "GET",
    path: "/bulk_imports/{import_id}/entities/{entity_id}/failures",
  },
});
