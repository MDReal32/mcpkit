import { defineTool } from "@usemcpkit/core";

export const projectsHooksCreateGroupsHooksEventsResend = defineTool({
  name: "projects:hooks:create_groups_hooks_events_resend",
  description:
    "Resend a webhook event. Resends a webhook event. This endpoint has a rate limit of five requests per minute for each authenticated user for a given project or group. On GitLab Self-Managed and GitLab Dedicated, an administrator can change this limit in the application settings.",
  input: {
    type: "object",
    properties: {
      hook_id: {
        type: "integer",
        description: "ID of the hook.",
      },
      hook_log_id: {
        type: "integer",
        description: "ID of the hook log entry.",
      },
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
    },
    required: ["hook_id", "hook_log_id", "id"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/hooks/{hook_id}/events/{hook_log_id}/resend",
  },
});
