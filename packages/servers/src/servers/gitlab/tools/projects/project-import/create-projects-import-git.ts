import { defineTool } from "@usemcpkit/core";

export const projectsProjectImportCreateProjectsImportGit = defineTool({
  name: "projects:project_import:create_projects_import_git",
  description:
    "Import a project from a Git URL. Imports a project from a specified Git URL. This feature was introduced in GitLab 18.10.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      import_url: {
        type: "string",
        description: "URL from which the project is imported.",
      },
      import_url_user: {
        type: "string",
        description: "Username for the import URL.",
      },
      import_url_password: {
        type: "string",
        description: "Password for the import URL.",
      },
    },
    required: ["id", "import_url"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/import/git",
    body: ["import_url", "import_url_user", "import_url_password"],
  },
});
