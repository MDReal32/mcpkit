import { defineTool } from "@usemcpkit/core";

export const fieldsIssueNotificationSchemesGetNotificationSchemes = defineTool({
  name: "fields:issue_notification_schemes:get_notification_schemes",
  description:
    "Get notification schemes paginated. Returns a paginated list of notification schemes ordered by the display name.",
  input: {
    type: "object",
    properties: {
      startAt: {
        type: "string",
        default: "0",
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResults: {
        type: "string",
        default: "50",
        description: "The maximum number of items to return per page.",
      },
      id: {
        type: "string",
        description: "The list of notification schemes IDs to be filtered by (comma-separated)",
      },
      projectId: {
        type: "string",
        description: "The list of projects IDs to be filtered by (comma-separated)",
      },
      onlyDefault: {
        type: "boolean",
        default: false,
        description:
          "When set to true, returns only the default notification scheme. If you provide project IDs not associated with the default, returns an empty page. The default value is false.",
      },
      expand: {
        type: "string",
        description:
          "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/notificationscheme",
    query: ["startAt", "maxResults", "id", "projectId", "onlyDefault", "expand"],
  },
});
