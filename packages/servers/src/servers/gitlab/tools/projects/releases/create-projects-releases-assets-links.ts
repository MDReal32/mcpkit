import { defineTool } from "@usemcpkit/core";

export const projectsReleasesCreateProjectsReleasesAssetsLinks = defineTool({
  name: "projects:releases:create_projects_releases_assets_links",
  description: "Create a release link. Creates an asset link for a specified release.",
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
      name: {
        type: "string",
        description: "Name of the link. Link names must be unique in the release.",
      },
      url: {
        type: "string",
        description: "URL of the link. Link URLs must be unique in the release.",
      },
      direct_asset_path: {
        type: "string",
        description: "Path for a direct asset link.",
      },
      filepath: {
        type: "string",
        description: "Path for a direct asset link. Deprecated. Use `direct_asset_path` instead.",
      },
      link_type: {
        type: "string",
        description: "Type of the link.",
        default: "other",
        enum: ["other", "runbook", "image", "package"],
      },
    },
    required: ["id", "tag_name", "name", "url"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/releases/{tag_name}/assets/links",
    body: ["name", "url", "direct_asset_path", "filepath", "link_type"],
  },
});
