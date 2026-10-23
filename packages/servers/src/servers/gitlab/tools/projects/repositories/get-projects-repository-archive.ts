import { defineTool } from "@usemcpkit/core";

export const projectsRepositoriesGetProjectsRepositoryArchive = defineTool({
  name: "projects:repositories:get_projects_repository_archive",
  description:
    "Retrieve file archive from a repository. Retrieves the file archive of a specified repository. This endpoint can be accessed without authentication if the repository is publicly accessible. For GitLab.com users, this endpoint has a rate limit threshold of 5 requests per minute.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      sha: {
        type: "string",
        description:
          "Commit SHA to download. Accepts a tag, branch reference, or SHA. If omitted, defaults to the tip of the default branch.",
      },
      ref_type: {
        type: "string",
        enum: ["heads", "tags"],
        description: "Type of ref in `sha`. Use to select the correct ref when a branch and tag share a name.",
      },
      format: {
        type: "string",
        description: "Archive format.",
      },
      path: {
        type: "string",
        description: "Subpath of the repository to download. An empty string returns the whole repository.",
      },
      include_lfs_blobs: {
        type: "boolean",
        default: true,
        description:
          "If `true`, LFS objects are included in the archive. When set to `false`, LFS objects are excluded.",
      },
      exclude_paths: {
        type: "string",
        description: "Comma-separated list of paths to exclude from the archive. (comma-separated)",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/repository/archive",
    query: ["sha", "ref_type", "format", "path", "include_lfs_blobs", "exclude_paths"],
  },
});
