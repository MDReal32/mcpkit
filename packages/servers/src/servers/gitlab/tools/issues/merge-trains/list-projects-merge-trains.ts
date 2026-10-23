import { defineTool } from "@usemcpkit/core";

export const issuesMergeTrainsListProjectsMergeTrains = defineTool({
  name: "issues:merge_trains:list_projects_merge_trains",
  description: "List all merge trains for a project. Lists all merge trains for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      scope: {
        type: "string",
        enum: ["active", "complete"],
        description: "Filter merge trains by scope.",
      },
      sort: {
        type: "string",
        default: "desc",
        enum: ["asc", "desc"],
        description:
          "Sort results in ascending or descending order by `id`. A lower `id` value means the merge request was added to the train earlier.",
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
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/merge_trains",
    query: ["scope", "sort", "page", "per_page"],
  },
});
