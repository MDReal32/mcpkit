import { defineTool } from "@usemcpkit/core";

export const usersSearchGetProjectsSearch = defineTool({
  name: "users:search:get_projects_search",
  description: "Search a project. Searches for content in a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      search: {
        type: "string",
        description: "Search query.",
      },
      scope: {
        type: "string",
        enum: [
          "issues",
          "work_items",
          "merge_requests",
          "milestones",
          "notes",
          "wiki_blobs",
          "commits",
          "blobs",
          "users",
        ],
        description: "Scope of the search.",
      },
      ref: {
        type: "string",
        description: "Name of the repository branch or tag. If omitted, uses the default branch.",
      },
      state: {
        type: "string",
        enum: ["all", "opened", "closed", "merged"],
        description:
          "Filter results by state. Applies only to the `issues`, `work_items`, and `merge_requests` scopes.",
      },
      confidential: {
        type: "boolean",
        description:
          "If `true`, returns only confidential results. If `false`, returns only non-confidential results. Applies only to the `issues` and `work_items` scopes.",
      },
      type: {
        type: "string",
        description:
          "Filter work items by type. Only applies to work_items scope. Available types: issue, task, epic, incident, test_case, requirement, objective, key_result, ticket. (comma-separated)",
      },
      fields: {
        type: "string",
        description:
          "Fields to search. Supports only `issues` and `merge_requests` scopes. Premium and Ultimate only. (comma-separated)",
      },
      num_context_lines: {
        type: "integer",
        description:
          "Number of context lines to include around each match in the results. Available for advanced and exact code search only. Introduced in GitLab 18.11.",
      },
      regex: {
        type: "boolean",
        description:
          "If `true`, uses regular expressions to search for code. If omitted, regular expressions are used. Available for exact code search. Introduced in GitLab 18.9.",
      },
      source_branch: {
        type: "string",
        description:
          "Filter merge requests by source branch. Available with advanced search and the merge_requests scope.",
      },
      target_branch: {
        type: "string",
        description:
          "Filter merge requests by target branch. Available with advanced search and the merge_requests scope.",
      },
      author_username: {
        type: "string",
        description:
          "Filter by author username. A username that matches no user is ignored. Available with advanced search and the issues, merge_requests and work_items scopes.",
      },
      label_name: {
        type: "string",
        description:
          "Filter by label name. A result must carry every name that resolves to an existing label; names that match no label are ignored. Maximum 30 names. Available with advanced search and the issues, merge_requests and work_items scopes. (comma-separated)",
      },
      not: {
        type: "object",
        description:
          "Filter out results matching the parameters supplied. Supplying a filter together with its negation matches either condition, which widens the result set.",
      },
      not_source_branch: {
        type: "string",
        description: "Exclude merge requests with this source branch",
      },
      not_target_branch: {
        type: "string",
        description: "Exclude merge requests with this target branch",
      },
      not_author_username: {
        type: "string",
        description: "Exclude results authored by this username",
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
    required: ["id", "search", "scope"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/(-/)search",
    query: {
      search: "search",
      scope: "scope",
      ref: "ref",
      state: "state",
      confidential: "confidential",
      type: "type",
      fields: "fields",
      num_context_lines: "num_context_lines",
      regex: "regex",
      source_branch: "source_branch",
      target_branch: "target_branch",
      author_username: "author_username",
      label_name: "label_name",
      not: "not",
      "not[source_branch]": "not_source_branch",
      "not[target_branch]": "not_target_branch",
      "not[author_username]": "not_author_username",
      page: "page",
      per_page: "per_page",
    },
    commaQuery: ["type", "fields", "label_name"],
  },
});
