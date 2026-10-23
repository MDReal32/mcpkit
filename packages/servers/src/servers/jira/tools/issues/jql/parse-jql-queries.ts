import { defineTool } from "@usemcpkit/core";

export const issuesJqlParseJqlQueries = defineTool({
  name: "issues:jql:parse_jql_queries",
  description: "Parse JQL query. Parses and validates JQL queries.",
  input: {
    type: "object",
    properties: {
      validation: {
        type: "string",
        default: "strict",
        enum: ["strict", "warn", "none"],
        description: "How to validate the JQL query and treat the validation results. Validation options include:",
      },
      queries: {
        type: "array",
        description: "A list of queries to parse.",
        items: {
          type: "string",
        },
      },
    },
    required: ["validation", "queries"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/jql/parse",
    query: ["validation"],
    body: ["queries"],
  },
});
