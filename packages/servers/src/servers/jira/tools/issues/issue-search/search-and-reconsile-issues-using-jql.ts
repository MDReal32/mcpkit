import { defineTool } from "@usemcpkit/core";

export const issuesIssueSearchSearchAndReconsileIssuesUsingJql = defineTool({
  name: "issues:issue_search:search_and_reconsile_issues_using_jql",
  description:
    "Search for issues using JQL enhanced search (GET). Searches for issues using JQL. Recent updates might not be immediately visible in the returned search results. If you need read-after-write consistency, you can utilize the `reconcileIssues` parameter to ensure stronger consistency assurances. This operation can be accessed anonymously.",
  input: {
    type: "object",
    properties: {
      jql: {
        type: "string",
        description:
          "A JQL expression. For performance reasons, this parameter requires a bounded query. A bounded query is a query with a search restriction.",
      },
      nextPageToken: {
        type: "string",
        description:
          "The token for a page to fetch that is not the first page. The first page has a `nextPageToken` of `null`. Use the `nextPageToken` to fetch the next page of issues. (Jira Cloud only)",
      },
      maxResults: {
        type: "integer",
        default: 50,
        description:
          "The maximum number of items to return per page. To manage page size, API may return fewer items per page where a large number of fields or properties are requested. The greatest number of items returned per page is achieved when requesting `id` or `key` only. It returns max 5000 issues.",
      },
      fields: {
        type: "string",
        description:
          "A list of fields to return for each issue, use it to retrieve a subset of fields. This parameter accepts a comma-separated list. Expand options include: (comma-separated)",
      },
      expand: {
        type: "string",
        description:
          "Use expand to include additional information about issues in the response. Note that, unlike the majority of instances where `expand` is specified, `expand` is defined as a comma-delimited string of values. The expand options are:",
      },
      properties: {
        type: "string",
        description:
          "A list of up to 5 issue properties to include in the results. This parameter accepts a comma-separated list. (comma-separated)",
      },
      fieldsByKeys: {
        type: "boolean",
        default: false,
        description: "Reference fields by their key (rather than ID). The default is `false`.",
      },
      failFast: {
        type: "boolean",
        default: false,
        description: "Fail this request early if we can't retrieve all field data.",
      },
      reconcileIssues: {
        type: "string",
        description:
          "Strong consistency issue ids to be reconciled with search results. Accepts max 50 ids. This list of ids should be consistent with each paginated request across different pages. (comma-separated) (Jira Cloud only)",
      },
      includeArchivedProjects: {
        type: "boolean",
        default: false,
        description:
          "Whether to also return issues that belong to archived projects. Issues in archived projects are excluded by default. Setting this to `true` returns them alongside issues from active projects; the *Browse projects* permission is still required on the archived project. The default is `false`. (Jira Cloud only)",
      },
      startAt: {
        type: "integer",
        default: 0,
        description: "The index of the first item to return in a page of results (page offset). (Data Center only)",
      },
      validateQuery: {
        type: "string",
        default: "strict",
        enum: ["strict", "warn", "none", "true", "false"],
        description:
          "Determines how to validate the JQL query and treat the validation results. Supported values are: (Data Center only)",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/search",
    query: [
      "jql",
      "startAt",
      "maxResults",
      "validateQuery",
      "fields",
      "expand",
      "properties",
      "fieldsByKeys",
      "failFast",
    ],
  },
  editions: {
    cloud: {
      request: {
        method: "GET",
        path: "/rest/api/2/search/jql",
        query: [
          "jql",
          "nextPageToken",
          "maxResults",
          "fields",
          "expand",
          "properties",
          "fieldsByKeys",
          "failFast",
          "reconcileIssues",
          "includeArchivedProjects",
        ],
      },
    },
  },
});
