import { defineTool } from "@usemcpkit/core";

export const collaborationFiltersGetFiltersPaginated = defineTool({
  name: "collaboration:filters:get_filters_paginated",
  description: "Search for filters. Returns a paginated list of filters. Use this operation to get:",
  input: {
    type: "object",
    properties: {
      filterName: {
        type: "string",
        description: "String used to perform a case-insensitive partial match with `name`.",
      },
      accountId: {
        type: "string",
        description:
          "User account ID used to return filters with the matching `owner.accountId`. This parameter cannot be used with `owner`.",
      },
      owner: {
        type: "string",
        description:
          "This parameter is deprecated because of privacy changes. Use `accountId` instead. See the migration guide for details. User name used to return filters with the matching `owner.name`. This parameter cannot be used with `accountId`.",
      },
      groupname: {
        type: "string",
        description:
          "As a group's name can change, use of `groupId` is recommended to identify a group. Group name used to returns filters that are shared with a group that matches `sharePermissions.group.groupname`. This parameter cannot be used with the `groupId` parameter.",
      },
      groupId: {
        type: "string",
        description:
          "Group ID used to returns filters that are shared with a group that matches `sharePermissions.group.groupId`. This parameter cannot be used with the `groupname` parameter.",
      },
      projectId: {
        type: "integer",
        description:
          "Project ID used to returns filters that are shared with a project that matches `sharePermissions.project.id`.",
      },
      id: {
        type: "string",
        description:
          "The list of filter IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. Do not exceed 200 filter IDs. (comma-separated)",
      },
      orderBy: {
        type: "string",
        default: "name",
        enum: [
          "description",
          "-description",
          "+description",
          "favourite_count",
          "-favourite_count",
          "+favourite_count",
          "id",
          "-id",
          "+id",
          "is_favourite",
          "-is_favourite",
          "+is_favourite",
          "name",
          "-name",
          "+name",
          "owner",
          "-owner",
          "+owner",
          "is_shared",
          "-is_shared",
          "+is_shared",
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
      expand: {
        type: "string",
        description:
          "Use expand to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:",
      },
      overrideSharePermissions: {
        type: "boolean",
        default: false,
        description:
          "EXPERIMENTAL: Whether share permissions are overridden to enable filters with any share permissions to be returned. Available to users with *Administer Jira* global permission.",
      },
      isSubstringMatch: {
        type: "boolean",
        default: false,
        description:
          "When `true` this will perform a case-insensitive substring match for the provided `filterName`. When `false` the filter name will be searched using full text search syntax.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/filter/search",
    query: [
      "filterName",
      "accountId",
      "owner",
      "groupname",
      "groupId",
      "projectId",
      "id",
      "orderBy",
      "startAt",
      "maxResults",
      "expand",
      "overrideSharePermissions",
      "isSubstringMatch",
    ],
  },
});
