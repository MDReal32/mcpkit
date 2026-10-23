import { defineTool } from "@usemcpkit/core";

export const usersSearchGetProjectsSearchSemantic = defineTool({
  name: "users:search:get_projects_search_semantic",
  description: "Search project code using natural language. Introduced in GitLab 18.11.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      q: {
        type: "string",
        description: "Natural language search query, for example `authentication middleware` or `rate limiting logic`.",
      },
      directory_path: {
        type: "string",
        description:
          "Restrict search to files under this directory path, for example `app/services/`. Must be a relative path with no leading slash and no `..` segments.",
      },
      knn: {
        type: "integer",
        default: 64,
        description:
          "Number of nearest neighbours to retrieve internally (default: 64). Higher values improve recall at the cost of latency.",
      },
      limit: {
        type: "integer",
        default: 20,
        description: "Maximum number of results to return (default: 20).",
      },
    },
    required: ["id", "q"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/(-/)search/semantic",
    query: ["q", "directory_path", "knn", "limit"],
  },
});
