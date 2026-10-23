import { defineTool } from "@usemcpkit/core";

export const fieldsIssueFieldsGetFieldsPaginated = defineTool({
  name: "fields:issue_fields:get_fields_paginated",
  description:
    "Get fields paginated. Returns a paginated list of fields for Classic Jira projects. The list can include:",
  input: {
    type: "object",
    properties: {
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
      type: {
        type: "string",
        description: "The type of fields to search. (comma-separated)",
      },
      id: {
        type: "string",
        description: "The IDs of the custom fields to return or, where `query` is specified, filter. (comma-separated)",
      },
      query: {
        type: "string",
        description: "String used to perform a case-insensitive partial match with field names or descriptions.",
      },
      orderBy: {
        type: "string",
        enum: [
          "contextsCount",
          "-contextsCount",
          "+contextsCount",
          "lastUsed",
          "-lastUsed",
          "+lastUsed",
          "name",
          "-name",
          "+name",
          "screensCount",
          "-screensCount",
          "+screensCount",
          "projectsCount",
          "-projectsCount",
          "+projectsCount",
        ],
        description: "Order the results by:",
      },
      expand: {
        type: "string",
        description:
          "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:",
      },
      projectIds: {
        type: "string",
        description:
          "The IDs of the projects to filter the fields by. Fields belonging to project Ids that the user does not have access to will not be returned (comma-separated)",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/field/search",
    query: ["startAt", "maxResults", "type", "id", "query", "orderBy", "expand", "projectIds"],
  },
});
