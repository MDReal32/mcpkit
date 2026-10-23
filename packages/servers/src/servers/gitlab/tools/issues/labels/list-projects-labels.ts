import { defineTool } from "@usemcpkit/core";

export const issuesLabelsListProjectsLabels = defineTool({
  name: "issues:labels:list_projects_labels",
  description:
    "List all project labels. Lists all labels for a specified project. By default, this request returns 20 results at a time because the API results are paginated.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      with_counts: {
        type: "boolean",
        default: false,
        description: "If `true`, includes issue and merge request counts.",
      },
      include_ancestor_groups: {
        type: "boolean",
        default: true,
        description: "If `true`, includes ancestor groups.",
      },
      search: {
        type: "string",
        description: "Keyword to filter labels by.",
      },
      archived: {
        type: "boolean",
        description:
          "If `true`, returns only archived labels. If `false`, returns only non-archived labels. If omitted, returns all labels. Introduced in GitLab 18.10.",
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
    path: "/projects/{id}/labels",
    query: ["with_counts", "include_ancestor_groups", "search", "archived", "page", "per_page"],
  },
});
