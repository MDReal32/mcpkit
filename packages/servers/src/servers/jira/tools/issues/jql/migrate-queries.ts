import { defineTool } from "@usemcpkit/core";

export const issuesJqlMigrateQueries = defineTool({
  name: "issues:jql:migrate_queries",
  description:
    "Convert user identifiers to account IDs in JQL queries. Converts one or more JQL queries with user identifiers (username or user key) to equivalent JQL queries with account IDs.",
  input: {
    type: "object",
    properties: {
      queryStrings: {
        type: "array",
        description: "A list of queries with user identifiers. Maximum of 100 queries.",
        items: {
          type: "string",
        },
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/2/jql/pdcleaner",
    body: ["queryStrings"],
  },
});
