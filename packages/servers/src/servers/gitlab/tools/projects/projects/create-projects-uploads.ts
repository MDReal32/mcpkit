import { defineTool } from "@usemcpkit/core";

export const projectsProjectsCreateProjectsUploads = defineTool({
  name: "projects:projects:create_projects_uploads",
  description: "Create an upload. Creates an upload.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      file: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["id", "file"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/uploads",
    body: ["file"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
});
