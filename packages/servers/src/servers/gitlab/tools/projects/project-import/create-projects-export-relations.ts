import { defineTool } from "@usemcpkit/core";

export const projectsProjectImportCreateProjectsExportRelations = defineTool({
  name: "projects:project_import:create_projects_export_relations",
  description: "Schedule a relations export for a project. Schedules a relations export for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      batched: {
        type: "boolean",
        description: "If `true`, exports in batches.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/export_relations",
    body: ["batched"],
  },
});
