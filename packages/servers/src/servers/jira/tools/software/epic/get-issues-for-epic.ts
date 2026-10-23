import { defineTool } from "@usemcpkit/core";

export const softwareEpicGetIssuesForEpic = defineTool({
  name: "software:epic:get_issues_for_epic",
  description:
    "[Deprecated] Get issues for epic. Returns all issues that belong to the epic, for the given epic ID. This only includes issues that the user has permission to view. Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic. By default, the returned issues are ordered by rank. **Note:** If you are querying a next-gen project, do not use this operation. Instead, search for issues that be…",
  input: {
    type: "object",
    properties: {
      epicIdOrKey: {
        type: "string",
        description: "The id or key of the epic that contains the requested issues.",
      },
      startAt: {
        type: "integer",
        description:
          "The starting index of the returned issues. Base index: 0. See the 'Pagination' section at the top of this page for more details.",
      },
      maxResults: {
        type: "integer",
        description:
          "The maximum number of issues to return per page. Default: 50. See the 'Pagination' section at the top of this page for more details. Note, the total number of issues returned is limited by the property 'jira.search.views.default.max' in your Jira instance. If you exceed this limit, your results will be truncated.",
      },
      jql: {
        type: "string",
        description:
          "Filters results using a JQL query. If you define an order in your JQL query, it will override the default order of the returned issues. Note that `username` and `userkey` can't be used as search terms for this parameter due to privacy reasons. Use `accountId` instead.",
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
    required: ["epicIdOrKey"],
  },
  request: {
    method: "GET",
    path: "/rest/agile/1.0/epic/{epicIdOrKey}/issue",
    query: ["startAt", "maxResults", "jql", "validateQuery", "fields", "expand"],
  },
});
