import { defineTool } from "@usemcpkit/core";

export const issuesJqlGetAutoComplete = defineTool({
  name: "issues:jql:get_auto_complete",
  description:
    "Get field reference data (GET). Returns reference data for JQL searches. This is a downloadable version of the documentation provided in Advanced searching - fields reference and Advanced searching - functions reference, along with a list of JQL-reserved words. Use this information to assist with the programmatic creation of JQL queries or the validation of queries built in a custom query builder.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/2/jql/autocompletedata",
  },
});
