import { defineTool } from "@usemcpkit/core";

export const issuesJqlFunctionsAppsUpdatePrecomputations = defineTool({
  name: "issues:jql_functions_apps:update_precomputations",
  description:
    "Update precomputations (apps). Update the precomputation value of a function created by a Forge/Connect app.",
  input: {
    type: "object",
    properties: {
      skipNotFoundPrecomputations: {
        type: "boolean",
        default: false,
      },
      values: {
        type: "array",
        items: {
          type: "object",
          description: "Precomputation id and its new value.",
          properties: {
            error: {
              type: "string",
              description:
                "The error message to be displayed to the user if the given function clause is no longer valid during recalculation of the precomputation.",
            },
            id: {
              type: "string",
              description: "The id of the precomputation to update.",
            },
            value: {
              type: "string",
              description: "The new value of the precomputation.",
            },
          },
          required: ["id"],
        },
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/2/jql/function/computation",
    query: ["skipNotFoundPrecomputations"],
    body: ["values"],
  },
});
