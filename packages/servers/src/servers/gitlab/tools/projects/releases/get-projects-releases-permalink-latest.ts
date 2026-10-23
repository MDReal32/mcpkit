import { defineTool } from "@usemcpkit/core";

export const projectsReleasesGetProjectsReleasesPermalinkLatest = defineTool({
  name: "projects:releases:get_projects_releases_permalink_latest",
  description: "Get the latest project release. This feature was introduced in GitLab 15.4.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/releases/permalink/latest",
  },
});
