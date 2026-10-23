import { defineTool } from "@usemcpkit/core";

export const fieldsIssueNotificationSchemesGetNotificationScheme = defineTool({
  name: "fields:issue_notification_schemes:get_notification_scheme",
  description:
    "Get notification scheme. Returns a notification scheme, including the list of events and the recipients who will receive notifications for those events.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description:
          "The ID of the notification scheme. Use Get notification schemes paginated to get a list of notification scheme IDs.",
      },
      expand: {
        type: "string",
        description:
          "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/notificationscheme/{id}",
    query: ["expand"],
  },
});
