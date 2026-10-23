import { defineTool } from "@usemcpkit/core";

export const projectsWikisCreateProjectsWikisAttachments = defineTool({
  name: "projects:wikis:create_projects_wikis_attachments",
  description:
    "Upload an attachment to a project wiki. Uploads a file to the `uploads` directory in a specified project wiki.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group or project.",
      },
      file: {
        type: "string",
        description: "Path of a local file to upload.",
      },
      branch: {
        type: "string",
        description: "The name of the branch",
      },
    },
    required: ["id", "file"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/wikis/attachments",
    body: ["file", "branch"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
});
