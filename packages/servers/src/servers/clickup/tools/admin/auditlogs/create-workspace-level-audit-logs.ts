import { defineTool } from "@usemcpkit/core";

export const adminAuditlogsCreateWorkspaceLevelAuditLogs = defineTool({
  name: "admin:auditlogs:create_workspace_level_audit_logs",
  description:
    "Create Workspace-level audit logs. Create Workspace-level audit logs. Only the Workspace owner can create audit logs. \\ \\ ***Note:** This endpoint is only available to Workspaces on our Enterprise Plan.*",
  input: {
    type: "object",
    properties: {
      workspace_id: {
        type: "number",
        description: "The ID of the Workspace.",
      },
      filter: {
        type: "object",
        description: "A filter containing the criteria to filter logs by.",
        properties: {
          workspaceId: {
            type: "object",
            description: "The ID of the Workspace.",
          },
          userId: {
            type: "array",
            description: "The user ID. This can be a single user or multiple.",
            items: {
              type: "string",
            },
          },
          userEmail: {
            type: "array",
            description: "User emails. This can be a single email or multiple.",
            items: {
              type: "string",
            },
          },
          eventType: {
            type: "string",
            description:
              "Types of events to filter by. Options include `USER_LOGIN`, `USER_LOGOUT`, `CHANGE_2FA`, `CHANGE_PASSWORD`, `CHANGE_EMAIL`, `JOIN_WORKSPACE`, `LEAVE_WORKSPACE`, `REMOVE_FROM_WORKSPACE`, `RESET_PASSWORD`, `ROLE_CHANGE`, `SCIM_PROVISION`, `SCIM_DEPROVISION`, `SCIM_UPDATE`, `ADVANCED_SETTINGS_UPDATED`, `CHANGE_ROLE_PERMISSIONS`, `INVITE_TO_WORKSPACE`, `CHANGE_USER_ROLE`, `CHANGE_SSO_POLICY`, `CHANGE…",
            enum: [
              "USER_LOGIN",
              "USER_LOGOUT",
              "CHANGE_2FA",
              "CHANGE_EMAIL",
              "CHANGE_PASSWORD",
              "JOIN_WORKSPACE",
              "LEAVE_WORKSPACE",
              "RESET_PASSWORD",
              "ROLE_CHANGE",
              "SCIM_DEPROVISION",
              "SCIM_PROVISION",
              "SCIM_UPDATE",
              "SECURE_LOGIN_EMAIL_SENT",
              "ADVANCED_SETTINGS_UPDATED",
              "CHANGE_2FA_POLICY",
              "CHANGE_ROLE_PERMISSIONS",
              "CHANGE_SSO_POLICY",
              "CHANGE_USER_ROLE",
              "CUSTOM_ROLE_CREATED",
              "CUSTOM_ROLE_DELETED",
              "CUSTOM_ROLE_UPDATED",
              "TEAM_CREATED",
              "TEAM_DELETED",
              "TEAM_EDITED",
              "TEAM_MEMBER_ADDED",
              "TEAM_MEMBER_REMOVED",
              "INVITE_TO_WORKSPACE",
              "REMOVE_FROM_WORKSPACE",
              "SCIM_GROUP_CREATED",
              "SCIM_GROUP_DELETED",
              "SCIM_GROUP_UPDATED",
              "SSO_CONFIG_UPDATED",
              "TASK_ARCHIVED",
              "TASK_ASSIGNEES_CHANGED",
              "TASK_CREATED",
              "TASK_CUSTOM_FIELD_VALUES_CHANGED",
              "TASK_DELETED",
              "TASK_PRIORITY_CHANGED",
              "TASK_RESTORED",
              "TASK_STATUS_CHANGED",
              "TASK_UNARCHIVED",
              "FIELD_CONVERTED",
              "FIELD_CREATED",
              "FIELD_DROPDOWN_OPTIONS_CREATED",
              "FIELD_DROPDOWN_OPTIONS_REMOVED",
              "FIELD_DROPDOWN_OPTIONS_UPDATED",
              "FIELD_DUPLICATED",
              "FIELD_GROUP_MEMBER_PERMISSION_REMOVED",
              "FIELD_GROUP_MEMBER_PERMISSION_SET",
              "FIELD_LABEL_OPTIONS_CREATED",
              "FIELD_LABEL_OPTIONS_REMOVED",
              "FIELD_LABEL_OPTIONS_UPDATED",
              "FIELD_LOCATION_ADDED",
              "FIELD_LOCATION_REMOVED",
              "FIELD_LOCATION_UPDATED",
              "FIELD_MEMBER_PERMISSION_REMOVED",
              "FIELD_MEMBER_PERMISSION_SET",
              "FIELD_MERGED",
              "FIELD_PERMANENTLY_REMOVED",
              "FIELD_REMOVED",
              "FIELD_RESTORED",
              "FIELD_UPDATED",
            ],
          },
          eventStatus: {
            type: "string",
            description:
              "Status of events you're filtering by. Options include `success`, `failed`, `started`, `completed`, `error`, `system_error`.",
            enum: ["success", "failed", "warn", "skipped", "started", "completed", "error", "system_error"],
          },
          startTime: {
            type: "number",
            description: "The start time to begin paginating your logs.",
          },
          endTime: {
            type: "number",
            description: "The end time to begin paginating your logs.",
          },
        },
      },
      applicability: {
        type: "string",
        description:
          "Type of logs to filter by. Options include `auth-and-security`, `custom-fields`, `hierarchy-activity` and `user-activity`. Most use cases will use `auth-and-security`.",
        enum: [
          "agent-settings-activity",
          "auth-and-security",
          "custom-fields",
          "hierarchy-activity",
          "user-activity",
          "other-activity",
        ],
      },
      pagination: {
        type: "object",
        description: "The pagination request determines where logs should start and how many to return.",
        properties: {
          pageRows: {
            type: "number",
            description: "The number of rows to return.",
          },
          pageTimestamp: {
            type: "number",
            description:
              "The timestamp to index on. This should be the timestamp of the last row on the previous page. If you are requesting the first page, this should be the current timestamp.",
          },
          pageDirection: {
            description:
              "Pagination direction. This should be set to `before` for most use cases. Options include `before` and `after`.",
          },
        },
      },
    },
    required: ["workspace_id"],
  },
  request: {
    method: "POST",
    path: "/v3/workspaces/{workspace_id}/auditlogs",
    body: ["filter", "applicability", "pagination"],
  },
});
