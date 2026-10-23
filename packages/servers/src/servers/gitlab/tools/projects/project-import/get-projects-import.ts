import { defineTool } from "@usemcpkit/core";

export const projectsProjectImportGetProjectsImport = defineTool({
  name: "projects:project_import:get_projects_import",
  description:
    "Retrieve the status of a project import. Retrieves the status of the most recent import for a specified project.",
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
    path: "/projects/{id}/import",
  },
});
