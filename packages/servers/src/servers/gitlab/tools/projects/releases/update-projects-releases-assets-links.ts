import { defineTool } from "@usemcpkit/core";

export const projectsReleasesUpdateProjectsReleasesAssetsLinks = defineTool({
  name: "projects:releases:update_projects_releases_assets_links",
  description: "Update a release link. Updates a specified asset link for a release.",
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
      name: {
        type: "string",
        description: "Name of the link. At least one of `name`, `url` must be provided.",
      },
      url: {
        type: "string",
        description: "URL of the link. At least one of `name`, `url` must be provided.",
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
    required: ["id", "tag_name", "link_id"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/releases/{tag_name}/assets/links/{link_id}",
    body: ["name", "url", "direct_asset_path", "filepath", "link_type"],
  },
});
