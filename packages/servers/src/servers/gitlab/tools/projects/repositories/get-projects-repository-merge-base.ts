import { defineTool } from "@usemcpkit/core";

export const projectsRepositoriesGetProjectsRepositoryMergeBase = defineTool({
  name: "projects:repositories:get_projects_repository_merge_base",
  description: "Retrieve a merge base. Retrieves the merge base for two specified commits.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      refs: {
        type: "string",
        description: "Refs to find the common ancestor of. Accepts multiple refs. (comma-separated)",
      },
    },
    required: ["id", "refs"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/repository/merge_base",
    query: ["refs"],
    commaQuery: ["refs"],
  },
});
