import { defineTool } from "@usemcpkit/core";

export const usersNotificationSettingsGetProjectsNotificationSettings = defineTool({
  name: "users:notification_settings:get_projects_notification_settings",
  description:
    "Retrieve notification settings for a project. Retrieves the notification level for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/notification_settings",
  },
});
