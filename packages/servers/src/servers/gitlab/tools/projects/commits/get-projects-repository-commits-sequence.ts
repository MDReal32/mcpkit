import { defineTool } from "@usemcpkit/core";

export const projectsCommitsGetProjectsRepositoryCommitsSequence = defineTool({
  name: "projects:commits:get_projects_repository_commits_sequence",
  description: "Retrieve a commit sequence. Retrieves the commit sequence for a specified commit.",
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
      first_parent: {
        type: "boolean",
        default: false,
        description: "If `true`, follows only the first parent commit upon seeing a merge commit.",
      },
    },
    required: ["id", "sha"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/repository/commits/{sha}/sequence",
    query: ["first_parent"],
  },
});
