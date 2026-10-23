import { defineTool } from "@usemcpkit/core";

export const projectsSubmodulesUpdateProjectsRepositorySubmodules = defineTool({
  name: "projects:submodules:update_projects_repository_submodules",
  description: "Update a submodule reference. Updates a reference for a specified submodule.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      submodule: {
        type: "string",
        description: "URL-encoded full path to the submodule, for example `lib%2Fclass%2Erb`.",
      },
      commit_sha: {
        type: "string",
        description: "Full commit SHA to update the submodule to.",
      },
      branch: {
        type: "string",
        description: "Name of the branch to commit into.",
      },
      commit_message: {
        type: "string",
        description: "Commit message. If omitted, a default message is used.",
      },
    },
    required: ["id", "submodule", "commit_sha", "branch"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/repository/submodules/{submodule}",
    body: ["commit_sha", "branch", "commit_message"],
  },
});
