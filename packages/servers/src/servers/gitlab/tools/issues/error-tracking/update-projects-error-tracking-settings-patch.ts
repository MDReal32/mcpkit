import { defineTool } from "@usemcpkit/core";

export const issuesErrorTrackingUpdateProjectsErrorTrackingSettingsPatch = defineTool({
  name: "issues:error_tracking:update_projects_error_tracking_settings_patch",
  description:
    "Update Error Tracking settings for a project. Updates Error Tracking settings for a specified project. You must have the Maintainer or Owner role for the project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      active: {
        type: "boolean",
        description: "If `true`, enables the already configured error tracking settings. If `false`, disables them.",
      },
      integrated: {
        type: "boolean",
        description: "If `true`, enables the integrated error tracking backend.",
      },
    },
    required: ["id", "active"],
  },
  request: {
    method: "PATCH",
    path: "/projects/{id}/error_tracking/settings",
    body: ["active", "integrated"],
  },
});
