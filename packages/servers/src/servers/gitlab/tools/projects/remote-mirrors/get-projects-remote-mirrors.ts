import { defineTool } from "@usemcpkit/core";

export const projectsRemoteMirrorsGetProjectsRemoteMirrors = defineTool({
  name: "projects:remote_mirrors:get_projects_remote_mirrors",
  description: "Retrieve a remote mirror for a project. Retrieves a specified remote mirror for a project.",
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
    method: "GET",
    path: "/projects/{id}/remote_mirrors/{mirror_id}",
  },
});
