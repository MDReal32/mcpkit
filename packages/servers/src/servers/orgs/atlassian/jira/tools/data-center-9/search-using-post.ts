import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const searchUsingPost = defineTool({
  name: "rest/api/2/search:post",
  description: "Search issues with JQL, for a query too long for a URL.",
  input: {
    type: "object",
    properties: {
      jql: {
        type: "string",
        description: 'JQL query, such as project = PROJ AND status = "In Progress" ORDER BY updated DESC.',
      },
      startAt: { type: "integer", description: "Index of the first result, from 0." },
      maxResults: { type: "integer", description: "Most results to return." },
      fields: {
        type: "array",
        items: { type: "string" },
        description: "Fields to return; all navigable fields when absent.",
      },
      expand: { type: "array", items: { type: "string" }, description: "Expansions, such as renderedFields." },
      validateQuery: { type: "boolean", description: "Whether an invalid query is an error; true when absent." },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/2/search",
    body: ["jql", "startAt", "maxResults", "fields", "expand", "validateQuery"],
  },
  applies: JIRA_DATA_CENTER_9,
});
