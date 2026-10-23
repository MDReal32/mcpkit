import { defineTool } from "@usemcpkit/core";

export const projectsProjectsRestore = defineTool({
  name: "projects:projects:restore",
  description:
    "Restore deleted or archived project. Restores a project that has been archived or placed in the Jira recycle bin.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "The project ID or project key (case sensitive).",
      },
    },
    required: ["projectIdOrKey"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/project/{projectIdOrKey}/restore",
  },
});
