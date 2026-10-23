import { defineTool } from "@usemcpkit/core";

export const projectsProjectsGetNotificationSchemeForProject = defineTool({
  name: "projects:projects:get_notification_scheme_for_project",
  description: "Get project notification scheme. Gets a notification scheme associated with the project.",
  input: {
    type: "object",
    properties: {
      projectKeyOrId: {
        type: "string",
        description: "The project ID or project key (case sensitive).",
      },
      expand: {
        type: "string",
        description:
          "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:",
      },
    },
    required: ["projectKeyOrId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/project/{projectKeyOrId}/notificationscheme",
    query: ["expand"],
  },
});
