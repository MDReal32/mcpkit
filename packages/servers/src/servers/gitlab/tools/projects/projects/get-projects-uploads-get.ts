import { defineTool } from "@usemcpkit/core";

export const projectsProjectsGetProjectsUploadsGet = defineTool({
  name: "projects:projects:get_projects_uploads_get",
  description:
    "Download an uploaded file by secret and filename. Downloads an uploaded file with a specified secret and filename. You must have the Guest, Planner, Reporter, Developer, Maintainer, or Owner role for the project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      secret: {
        type: "string",
        description: "Secret of the upload.",
      },
      filename: {
        type: "string",
        description: "Filename of the upload.",
      },
      save_to: {
        type: "string",
        description: "Local path the downloaded file is saved to.",
      },
    },
    required: ["id", "secret", "filename", "save_to"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/uploads/{secret}/{filename}",
    saveToArg: "save_to",
  },
});
