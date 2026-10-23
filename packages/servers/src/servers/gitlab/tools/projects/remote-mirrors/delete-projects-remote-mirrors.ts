import { defineTool } from "@usemcpkit/core";

export const projectsRemoteMirrorsDeleteProjectsRemoteMirrors = defineTool({
  name: "projects:remote_mirrors:delete_projects_remote_mirrors",
  description: "Delete a remote mirror from a project. Deletes a specified remote mirror from a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      mirror_id: {
        type: "string",
        description: "ID of the remote mirror.",
      },
    },
    required: ["id", "mirror_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/remote_mirrors/{mirror_id}",
  },
});
