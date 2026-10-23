import { defineTool } from "@usemcpkit/core";

export const projectsProjectImportGetProjectsExportDownload = defineTool({
  name: "projects:project_import:get_projects_export_download",
  description: "Download a project export. Downloads the most recent export of a specified project.",
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
    path: "/projects/{id}/export/download",
  },
});
