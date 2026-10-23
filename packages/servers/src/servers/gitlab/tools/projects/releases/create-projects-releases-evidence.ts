import { defineTool } from "@usemcpkit/core";

export const projectsReleasesCreateProjectsReleasesEvidence = defineTool({
  name: "projects:releases:create_projects_releases_evidence",
  description: "Generate release evidence. Generates an evidence for an existing release.",
  input: {
    type: "object",
    properties: {
      tag_name: {
        type: "string",
        description: "Git tag the release is associated with.",
      },
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["tag_name", "id"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/releases/{tag_name}/evidence",
  },
});
