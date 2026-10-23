import { defineTool } from "@usemcpkit/core";

export const usersNotificationSettingsGetGroupsNotificationSettings = defineTool({
  name: "users:notification_settings:get_groups_notification_settings",
  description: "Retrieve notification settings for a group. Retrieves the notification level for a specified group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/notification_settings",
  },
});
