import { defineTool } from "@usemcpkit/core";

export const projectsProjectsDeleteProjectsUploadsDelete = defineTool({
  name: "projects:projects:delete_projects_uploads_delete",
  description:
    "Delete an uploaded file by secret and filename. Deletes an uploaded file with a specified secret and filename. You must have the Maintainer or Owner role for the project.",
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
    },
    required: ["id", "secret", "filename"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/uploads/{secret}/{filename}",
  },
});
