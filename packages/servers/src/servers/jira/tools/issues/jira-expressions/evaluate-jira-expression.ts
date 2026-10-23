import { defineTool } from "@usemcpkit/core";

export const issuesJiraExpressionsEvaluateJiraExpression = defineTool({
  name: "issues:jira_expressions:evaluate_jira_expression",
  description:
    "[Deprecated] Currently being removed. Evaluate Jira expression. Endpoint is currently being removed. More details",
  input: {
    type: "object",
    properties: {
      expand: {
        type: "string",
        description:
          "Use expand to include additional information in the response. This parameter accepts `meta.complexity` that returns information about the expression complexity. For example, the number of expensive operations used by the expression and how close the expression is to reaching the complexity limit. Useful when designing and debugging your expressions.",
      },
      context: {
        type: "object",
        description: "The context in which the Jira expression is evaluated.",
        properties: {
          board: {
            type: "integer",
            description:
              "The ID of the board that is available under the `board` variable when evaluating the expression.",
          },
          custom: {
            type: "array",
            description:
              "Custom context variables and their types. These variable types are available for use in a custom context:",
            items: {
              type: "object",
            },
          },
          customerRequest: {
            type: "integer",
            description:
              "The ID of the customer request that is available under the `customerRequest` variable when evaluating the expression. This is the same as the ID of the underlying Jira issue, but the customer request context variable will have a different type.",
          },
          issue: {
            type: "object",
            description: "The issue that is available under the `issue` variable when evaluating the expression.",
            properties: {
              id: {
                type: "integer",
                description: "The ID of the referenced item.",
              },
              key: {
                type: "string",
                description: "The key of the referenced item.",
              },
            },
          },
          issues: {
            type: "object",
            description:
              "The collection of issues that is available under the `issues` variable when evaluating the expression.",
            properties: {
              jql: {
                type: "object",
                description: "The JQL query that specifies the set of issues available in the Jira expression.",
              },
            },
          },
          project: {
            type: "object",
            description: "The project that is available under the `project` variable when evaluating the expression.",
            properties: {
              id: {
                type: "integer",
                description: "The ID of the referenced item.",
              },
              key: {
                type: "string",
                description: "The key of the referenced item.",
              },
            },
          },
          serviceDesk: {
            type: "integer",
            description:
              "The ID of the service desk that is available under the `serviceDesk` variable when evaluating the expression.",
          },
          sprint: {
            type: "integer",
            description:
              "The ID of the sprint that is available under the `sprint` variable when evaluating the expression.",
          },
        },
      },
      expression: {
        type: "string",
        description: "The Jira expression to evaluate.",
      },
    },
    required: ["expression"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/expression/eval",
    query: ["expand"],
    body: ["context", "expression"],
  },
});
