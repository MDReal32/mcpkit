import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const search = defineTool({
  name: "rest/api/2/search:get",
  description: "Search issues with JQL.",
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
        type: "string",
        description: "Fields to return, comma-separated (summary,status,assignee); all navigable fields when absent.",
      },
      expand: {
        type: "string",
        description: "Comma-separated expansions, such as renderedFields,changelog,transitions.",
      },
      validateQuery: { type: "boolean", description: "Whether an invalid query is an error; true when absent." },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/search",
    query: ["jql", "startAt", "maxResults", "fields", "expand", "validateQuery"],
  },
  applies: JIRA_DATA_CENTER_9,
});
