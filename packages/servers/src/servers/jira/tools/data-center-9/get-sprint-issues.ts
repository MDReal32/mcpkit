import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const getSprintIssues = defineTool({
  name: "rest/agile/1.0/sprint/{sprintId}/issue:get",
  description: "List the issues of a sprint.",
  input: {
    type: "object",
    properties: {
      sprintId: { type: "integer", description: "The sprint id." },
      jql: { type: "string", description: "JQL that narrows the issues further." },
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
    },
    required: ["sprintId"],
  },
  request: {
    method: "GET",
    path: "/rest/agile/1.0/sprint/{sprintId}/issue",
    query: ["jql", "startAt", "maxResults", "fields", "expand"],
  },
  applies: JIRA_DATA_CENTER_9,
});
