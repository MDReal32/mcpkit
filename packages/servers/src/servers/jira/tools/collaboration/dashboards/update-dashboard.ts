import { defineTool } from "@usemcpkit/core";

export const collaborationDashboardsUpdateDashboard = defineTool({
  name: "collaboration:dashboards:update_dashboard",
  description: "Update dashboard. Updates a dashboard, replacing all the dashboard details with those provided.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the dashboard to update.",
      },
      extendAdminPermissions: {
        type: "boolean",
        default: false,
        description:
          "Whether admin level permissions are used. It should only be true if the user has *Administer Jira* global permission",
      },
      description: {
        type: "string",
        description: "The description of the dashboard.",
      },
      editPermissions: {
        type: "array",
        description: "The edit permissions for the dashboard.",
        items: {
          type: "object",
          description: "Details of a share permission for the filter.",
          properties: {
            group: {
              type: "object",
              description:
                "The group that the filter is shared with. For a request, specify the `groupId` or `name` property for the group. As a group's name can change, use of `groupId` is recommended.",
            },
            id: {
              type: "integer",
              description: "The unique identifier of the share permission.",
            },
            project: {
              type: "object",
              description:
                "The project that the filter is shared with. This is similar to the project object returned by Get project but it contains a subset of the properties, which are: `self`, `id`, `key`, `assigneeType`, `name`, `roles`, `avatarUrls`, `projectType`, `simplified`. For a request, specify the `id` for the project.",
            },
            role: {
              type: "object",
              description:
                "The project role that the filter is shared with. For a request, specify the `id` for the role. You must also specify the `project` object and `id` for the project that the role is in.",
            },
            type: {
              type: "string",
              description: "The type of share permission:",
              enum: [
                "user",
                "group",
                "project",
                "projectRole",
                "global",
                "loggedin",
                "authenticated",
                "project-unknown",
              ],
            },
            user: {
              type: "object",
              description:
                "The user account ID that the filter is shared with. For a request, specify the `accountId` property for the user.",
            },
          },
          required: ["type"],
        },
      },
      name: {
        type: "string",
        description: "The name of the dashboard.",
      },
      sharePermissions: {
        type: "array",
        description: "The share permissions for the dashboard.",
        items: {
          type: "object",
          description: "Details of a share permission for the filter.",
          properties: {
            group: {
              type: "object",
              description:
                "The group that the filter is shared with. For a request, specify the `groupId` or `name` property for the group. As a group's name can change, use of `groupId` is recommended.",
            },
            id: {
              type: "integer",
              description: "The unique identifier of the share permission.",
            },
            project: {
              type: "object",
              description:
                "The project that the filter is shared with. This is similar to the project object returned by Get project but it contains a subset of the properties, which are: `self`, `id`, `key`, `assigneeType`, `name`, `roles`, `avatarUrls`, `projectType`, `simplified`. For a request, specify the `id` for the project.",
            },
            role: {
              type: "object",
              description:
                "The project role that the filter is shared with. For a request, specify the `id` for the role. You must also specify the `project` object and `id` for the project that the role is in.",
            },
            type: {
              type: "string",
              description: "The type of share permission:",
              enum: [
                "user",
                "group",
                "project",
                "projectRole",
                "global",
                "loggedin",
                "authenticated",
                "project-unknown",
              ],
            },
            user: {
              type: "object",
              description:
                "The user account ID that the filter is shared with. For a request, specify the `accountId` property for the user.",
            },
          },
          required: ["type"],
        },
      },
    },
    required: ["id", "editPermissions", "name", "sharePermissions"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/dashboard/{id}",
    query: ["extendAdminPermissions"],
    body: ["description", "editPermissions", "name", "sharePermissions"],
  },
});
