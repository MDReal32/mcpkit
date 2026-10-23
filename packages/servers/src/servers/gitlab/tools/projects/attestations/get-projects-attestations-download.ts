import { defineTool } from "@usemcpkit/core";

export const projectsAttestationsGetProjectsAttestationsDownload = defineTool({
  name: "projects:attestations:get_projects_attestations_download",
  description: "Retrieve an attestation bundle. This feature was introduced in GitLab 18.7",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      attestation_iid: {
        type: "string",
        description: "Internal ID of the attestation, as returned by the list attestations API endpoint.",
      },
    },
    required: ["id", "attestation_iid"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/attestations/{attestation_iid}/download",
  },
});
