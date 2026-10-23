import { defineTool } from "@usemcpkit/core";

export const projectsReleasesListProjectsReleasesAssetsLinks = defineTool({
  name: "projects:releases:list_projects_releases_assets_links",
  description: "List all release links. Lists all assets as links from a release.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      tag_name: {
        type: "string",
        description: "Tag associated with the release.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
    required: ["id", "tag_name"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/releases/{tag_name}/assets/links",
    query: ["page", "per_page"],
  },
});
