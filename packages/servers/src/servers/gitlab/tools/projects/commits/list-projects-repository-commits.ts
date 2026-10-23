import { defineTool } from "@usemcpkit/core";

export const projectsCommitsListProjectsRepositoryCommits = defineTool({
  name: "projects:commits:list_projects_repository_commits",
  description: "List all repository commits. Lists all commits for a specified project repository.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      ref_name: {
        type: "string",
        description: "Name of a repository branch, tag, or revision range. Uses the default branch if not given.",
      },
      since: {
        type: "string",
        description: "Only commits after or on this date are returned.",
      },
      until: {
        type: "string",
        description: "Only commits before or on this date are returned.",
      },
      path: {
        type: "string",
        description: "File path relative to the repository.",
      },
      follow: {
        type: "boolean",
        description:
          "If `true`, follows file renames when filtering commits by `path` and returns commits for the file even if it was renamed. If `false`, returns only commits where the file existed at its current path. Used only when `path` specifies a single file.",
      },
      author: {
        type: "string",
        description: "Filter commits by commit author.",
      },
      all: {
        type: "boolean",
        description: "If `true`, retrieves every commit from the repository and ignores the `ref_name` parameter.",
      },
      with_stats: {
        type: "boolean",
        description: "If `true`, includes statistics for each commit in the response.",
      },
      first_parent: {
        type: "boolean",
        description: "If `true`, follows only the first parent commit upon seeing a merge commit.",
      },
      order: {
        type: "string",
        default: "default",
        enum: ["default", "topo"],
        description: "Order in which to list commits, either reverse chronological or topological.",
      },
      trailers: {
        type: "boolean",
        default: false,
        description: "If `true`, parses and includes Git trailers for every commit.",
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
      pagination: {
        type: "string",
        default: "legacy",
        enum: ["legacy", "keyset"],
        description: "Specify the pagination method.",
      },
      page_token: {
        type: "string",
        description: "Record from which to start the keyset pagination.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/repository/commits",
    query: [
      "ref_name",
      "since",
      "until",
      "path",
      "follow",
      "author",
      "all",
      "with_stats",
      "first_parent",
      "order",
      "trailers",
      "page",
      "per_page",
      "pagination",
      "page_token",
    ],
  },
});
