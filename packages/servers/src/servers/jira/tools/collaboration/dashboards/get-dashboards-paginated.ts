import { defineTool } from "@usemcpkit/core";

export const collaborationDashboardsGetDashboardsPaginated = defineTool({
  name: "collaboration:dashboards:get_dashboards_paginated",
  description:
    "Search for dashboards. Returns a paginated list of dashboards. This operation is similar to Get dashboards except that the results can be refined to include dashboards that have specific attributes. For example, dashboards with a particular name. When multiple attributes are specified only filters matching all attributes are returned.",
  input: {
    type: "object",
    properties: {
      dashboardName: {
        type: "string",
        description: "String used to perform a case-insensitive partial match with `name`.",
      },
      accountId: {
        type: "string",
        description:
          "User account ID used to return dashboards with the matching `owner.accountId`. This parameter cannot be used with the `owner` parameter.",
      },
      owner: {
        type: "string",
        description:
          "This parameter is deprecated because of privacy changes. Use `accountId` instead. See the migration guide for details. User name used to return dashboards with the matching `owner.name`. This parameter cannot be used with the `accountId` parameter.",
      },
      groupname: {
        type: "string",
        description:
          "As a group's name can change, use of `groupId` is recommended. Group name used to return dashboards that are shared with a group that matches `sharePermissions.group.name`. This parameter cannot be used with the `groupId` parameter.",
      },
      groupId: {
        type: "string",
        description:
          "Group ID used to return dashboards that are shared with a group that matches `sharePermissions.group.groupId`. This parameter cannot be used with the `groupname` parameter.",
      },
      projectId: {
        type: "integer",
        description:
          "Project ID used to returns dashboards that are shared with a project that matches `sharePermissions.project.id`.",
      },
      orderBy: {
        type: "string",
        default: "name",
        enum: [
          "description",
          "-description",
          "+description",
          "favorite_count",
          "-favorite_count",
          "+favorite_count",
          "id",
          "-id",
          "+id",
          "is_favorite",
          "-is_favorite",
          "+is_favorite",
          "name",
          "-name",
          "+name",
          "owner",
          "-owner",
          "+owner",
        ],
        description: "Order the results by a field:",
      },
      startAt: {
        type: "integer",
        default: 0,
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResults: {
        type: "integer",
        default: 50,
        description: "The maximum number of items to return per page.",
      },
      status: {
        type: "string",
        default: "active",
        enum: ["active", "archived", "deleted"],
        description: "The status to filter by. It may be active, archived or deleted.",
      },
      expand: {
        type: "string",
        description:
          "Use expand to include additional information about dashboard in the response. This parameter accepts a comma-separated list. Expand options include:",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/dashboard/search",
    query: [
      "dashboardName",
      "accountId",
      "owner",
      "groupname",
      "groupId",
      "projectId",
      "orderBy",
      "startAt",
      "maxResults",
      "status",
      "expand",
    ],
  },
});
