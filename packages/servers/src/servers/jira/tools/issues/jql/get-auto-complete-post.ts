import { defineTool } from "@usemcpkit/core";

export const issuesJqlGetAutoCompletePost = defineTool({
  name: "issues:jql:get_auto_complete_post",
  description:
    "Get field reference data (POST). Returns reference data for JQL searches. This is a downloadable version of the documentation provided in Advanced searching - fields reference and Advanced searching - functions reference, along with a list of JQL-reserved words. Use this information to assist with the programmatic creation of JQL queries or the validation of queries built in a custom query builder.",
  input: {
    type: "object",
    properties: {
      includeCollapsedFields: {
        type: "boolean",
        description: "Include collapsed fields for fields that have non-unique names.",
        default: false,
      },
      projectIds: {
        type: "array",
        description: "List of project IDs used to filter the visible field details returned.",
        items: {
          type: "integer",
        },
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/2/jql/autocompletedata",
    body: ["includeCollapsedFields", "projectIds"],
  },
});
