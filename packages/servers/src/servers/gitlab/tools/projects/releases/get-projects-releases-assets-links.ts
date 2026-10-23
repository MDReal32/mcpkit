import { defineTool } from "@usemcpkit/core";

export const projectsReleasesGetProjectsReleasesAssetsLinks = defineTool({
  name: "projects:releases:get_projects_releases_assets_links",
  description: "Retrieve a release link. Retrieves a specified asset as a link from a release.",
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
      link_id: {
        type: "integer",
        description: "ID of the link.",
      },
    },
    required: ["id", "tag_name", "link_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/releases/{tag_name}/assets/links/{link_id}",
  },
});
