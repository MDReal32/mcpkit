import { defineTool } from "@usemcpkit/core";

export const softwareEpicGetIssuesWithoutEpic = defineTool({
  name: "software:epic:get_issues_without_epic",
  description:
    "[Deprecated] Get issues without epic. Returns all issues that do not belong to any epic. This only includes issues that the user has permission to view. Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic. By default, the returned issues are ordered by rank. **Note:** If you are querying a next-gen project, do not use this operation. Instead, search for issues that don't belong to an…",
  input: {
    type: "object",
    properties: {
      startAt: {
        type: "integer",
        description:
          "The starting index of the returned issues. Base index: 0. See the 'Pagination' section at the top of this page for more details.",
      },
      maxResults: {
        type: "integer",
        description:
          "The maximum number of issues to return per page. See the 'Pagination' section at the top of this page for more details. Note, the total number of issues returned is limited by the property 'jira.search.views.default.max' in your Jira instance. If you exceed this limit, your results will be truncated.",
      },
      jql: {
        type: "string",
        description:
          "Filters results using a JQL query. If you define an order in your JQL query, it will override the default order of the returned issues.",
      },
      validateQuery: {
        type: "boolean",
        description: "Specifies whether to validate the JQL query or not. Default: true.",
      },
      fields: {
        type: "string",
        description:
          "The list of fields to return for each issue. By default, all navigable and Agile fields are returned. (comma-separated)",
      },
      expand: {
        type: "string",
        description: "A comma-separated list of the parameters to expand.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/agile/1.0/epic/none/issue",
    query: ["startAt", "maxResults", "jql", "validateQuery", "fields", "expand"],
  },
});
