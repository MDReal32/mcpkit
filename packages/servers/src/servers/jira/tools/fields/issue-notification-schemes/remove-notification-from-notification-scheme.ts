import { defineTool } from "@usemcpkit/core";

export const fieldsIssueNotificationSchemesRemoveNotificationFromNotificationScheme = defineTool({
  name: "fields:issue_notification_schemes:remove_notification_from_notification_scheme",
  description: "Remove notification from notification scheme. Removes a notification from a notification scheme.",
  input: {
    type: "object",
    properties: {
      notificationSchemeId: {
        type: "string",
        description: "The ID of the notification scheme.",
      },
      notificationId: {
        type: "string",
        description: "The ID of the notification.",
      },
    },
    required: ["notificationSchemeId", "notificationId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/notificationscheme/{notificationSchemeId}/notification/{notificationId}",
  },
});
