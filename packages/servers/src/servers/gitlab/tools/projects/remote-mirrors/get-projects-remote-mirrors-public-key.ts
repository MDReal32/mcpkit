import { defineTool } from "@usemcpkit/core";

export const projectsRemoteMirrorsGetProjectsRemoteMirrorsPublicKey = defineTool({
  name: "projects:remote_mirrors:get_projects_remote_mirrors_public_key",
  description:
    "Retrieve a public key for a remote mirror. Retrieves the public key of a specified remote mirror that uses SSH authentication.",
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
    path: "/projects/{id}/remote_mirrors/{mirror_id}/public_key",
  },
});
