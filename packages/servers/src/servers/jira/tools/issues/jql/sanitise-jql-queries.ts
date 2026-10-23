import { defineTool } from "@usemcpkit/core";

export const issuesJqlSanitiseJqlQueries = defineTool({
  name: "issues:jql:sanitise_jql_queries",
  description:
    "Sanitize JQL queries. Sanitizes one or more JQL queries by converting readable details into IDs where a user doesn't have permission to view the entity.",
  input: {
    type: "object",
    properties: {
      queries: {
        type: "array",
        description: "The list of JQL queries to sanitize. Must contain unique values. Maximum of 20 queries.",
        items: {
          type: "object",
          description:
            "The JQL query to sanitize for the account ID. If the account ID is null, sanitizing is performed for an anonymous user.",
          properties: {
            accountId: {
              type: "string",
              description:
                "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.",
            },
            query: {
              type: "string",
              description: "The query to sanitize.",
            },
          },
          required: ["query"],
        },
      },
    },
    required: ["queries"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/jql/sanitize",
    body: ["queries"],
  },
});
