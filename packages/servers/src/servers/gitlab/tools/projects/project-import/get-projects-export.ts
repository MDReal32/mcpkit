import { defineTool } from "@usemcpkit/core";

export const projectsProjectImportGetProjectsExport = defineTool({
  name: "projects:project_import:get_projects_export",
  description:
    "Retrieve the status of a project export. Retrieves the status of the most recent export for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/export",
  },
});
