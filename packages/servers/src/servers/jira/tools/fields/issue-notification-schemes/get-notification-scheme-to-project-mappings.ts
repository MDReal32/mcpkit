import { defineTool } from "@usemcpkit/core";

export const fieldsIssueNotificationSchemesGetNotificationSchemeToProjectMappings = defineTool({
  name: "fields:issue_notification_schemes:get_notification_scheme_to_project_mappings",
  description:
    "Get projects using notification schemes paginated. Returns a paginated mapping of project that have notification scheme assigned. You can provide either one or multiple notification scheme IDs or project IDs to filter by. If you don't provide any, this will return a list of all mappings. Note that only company-managed (classic) projects are supported. This is because team-managed projects don't have a concept of a default notification scheme. The…",
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
      notificationSchemeId: {
        type: "string",
        description: "The list of notifications scheme IDs to be filtered out (comma-separated)",
      },
      projectId: {
        type: "string",
        description: "The list of project IDs to be filtered out (comma-separated)",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/notificationscheme/project",
    query: ["startAt", "maxResults", "notificationSchemeId", "projectId"],
  },
});
