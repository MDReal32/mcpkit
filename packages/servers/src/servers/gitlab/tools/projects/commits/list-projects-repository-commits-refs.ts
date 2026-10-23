import { defineTool } from "@usemcpkit/core";

export const projectsCommitsListProjectsRepositoryCommitsRefs = defineTool({
  name: "projects:commits:list_projects_repository_commits_refs",
  description:
    "List all references a commit is pushed to. Lists all references (from branches or tags) a commit is pushed to. The pagination parameters `page` and `per_page` can be used to restrict the list of references.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      sha: {
        type: "string",
        description: "Commit SHA.",
      },
      type: {
        type: "string",
        default: "all",
        enum: ["branch", "tag", "all"],
        description: "Type of references to return for the commit.",
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
    required: ["id", "sha"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/repository/commits/{sha}/refs",
    query: ["type", "page", "per_page"],
  },
});
