import { defineTool } from "@usemcpkit/core";

export const issuesErrorTrackingGetProjectsErrorTrackingSettings = defineTool({
  name: "issues:error_tracking:get_projects_error_tracking_settings",
  description:
    "Retrieve Error Tracking settings for a project. Retrieves the Error Tracking settings for a specified project.",
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
    path: "/projects/{id}/error_tracking/settings",
  },
});
