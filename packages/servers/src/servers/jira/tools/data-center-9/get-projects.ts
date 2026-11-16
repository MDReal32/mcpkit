import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const getProjects = defineTool({
  name: "rest/api/2/project:get",
  description: "List the projects the user can browse.",
  input: {
    type: "object",
    properties: {
      expand: { type: "string", description: "Comma-separated expansions, such as description,lead." },
      recent: { type: "integer", description: "Only this many recently viewed projects." },
      includeArchived: { type: "boolean", description: "Whether archived projects are listed too." },
    },
  },
  request: { method: "GET", path: "/rest/api/2/project", query: ["expand", "recent", "includeArchived"] },
  applies: JIRA_DATA_CENTER_9,
});
