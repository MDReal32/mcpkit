import { defineTool } from "@usemcpkit/core";

export const projectsProjectsArchiveProject = defineTool({
  name: "projects:projects:archive_project",
  description:
    "Archive project. Archives a project. You can't delete a project if it's archived. To delete an archived project, restore the project and then delete it. To restore a project, use the Jira UI.",
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
    path: "/rest/api/2/project/{projectIdOrKey}/archive",
  },
});
