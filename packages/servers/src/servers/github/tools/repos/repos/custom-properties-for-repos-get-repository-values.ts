import { defineTool } from "@usemcpkit/core";

export const reposReposCustomPropertiesForReposGetRepositoryValues = defineTool({
  name: "repos:repos:custom_properties_for_repos_get_repository_values",
  description:
    "Get all custom property values for a repository. Gets all custom property values that are set for a repository. Users with read access to the repository can use this endpoint.",
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
    },
    required: ["owner", "repo"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/properties/values",
  },
});
