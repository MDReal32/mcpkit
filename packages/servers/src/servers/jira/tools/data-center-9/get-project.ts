import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const getProject = defineTool({
  name: "rest/api/2/project/{projectIdOrKey}:get",
  description: "Get a project with its issue types, components and versions.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: { type: "string", description: "Project id or key." },
      expand: { type: "string", description: "Comma-separated expansions." },
    },
    required: ["projectIdOrKey"],
  },
  request: { method: "GET", path: "/rest/api/2/project/{projectIdOrKey}", query: ["expand"] },
  applies: JIRA_DATA_CENTER_9,
});
