import { defineTool } from "@usemcpkit/core";

export const projectsProjectImportListProjectsExportRelationsStatus = defineTool({
  name: "projects:project_import:list_projects_export_relations_status",
  description:
    "Retrieve the status of an relations export for a project. Retrieves the status of a relations export for a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      relation: {
        type: "string",
        description: "Name of the project top-level relation to download or view.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/export_relations/status",
    query: ["relation"],
  },
});
