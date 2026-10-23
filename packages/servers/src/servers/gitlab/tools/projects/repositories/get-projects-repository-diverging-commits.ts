import { defineTool } from "@usemcpkit/core";

export const projectsRepositoriesGetProjectsRepositoryDivergingCommits = defineTool({
  name: "projects:repositories:get_projects_repository_diverging_commits",
  description:
    "Retrieve diverging commit counts between two refs. Retrieves the number of commits by which the `to` ref is ahead of and behind the `from` ref.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      from: {
        type: "string",
        description: "Ref to compare from. Accepts a commit SHA, branch name, or tag name.",
      },
      to: {
        type: "string",
        description: "Ref to compare to. Accepts a commit SHA, branch name, or tag name.",
      },
      max_count: {
        type: "integer",
        default: 0,
        description: "Maximum number of commits to count. Use `0` for unlimited.",
      },
    },
    required: ["id", "from", "to"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/repository/diverging_commits",
    query: ["from", "to", "max_count"],
  },
});
