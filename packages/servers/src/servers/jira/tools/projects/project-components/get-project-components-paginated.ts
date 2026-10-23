import { defineTool } from "@usemcpkit/core";

export const projectsProjectComponentsGetProjectComponentsPaginated = defineTool({
  name: "projects:project_components:get_project_components_paginated",
  description:
    "Get project components paginated. Returns a paginated list of all components in a project. See the Get project components resource if you want to get a full list of versions without pagination.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "The project ID or project key (case sensitive).",
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
      orderBy: {
        type: "string",
        enum: [
          "description",
          "-description",
          "+description",
          "issueCount",
          "-issueCount",
          "+issueCount",
          "lead",
          "-lead",
          "+lead",
          "name",
          "-name",
          "+name",
        ],
        description: "Order the results by a field:",
      },
      componentSource: {
        type: "string",
        default: "jira",
        enum: ["jira", "compass", "auto"],
        description:
          "The source of the components to return. Can be `jira` (default), `compass` or `auto`. When `auto` is specified, the API will return connected Compass components if the project is opted into Compass, otherwise it will return Jira components. Defaults to `jira`.",
      },
      query: {
        type: "string",
        description:
          "Filter the results using a literal string. Components with a matching `name` or `description` are returned (case insensitive).",
      },
    },
    required: ["projectIdOrKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/project/{projectIdOrKey}/component",
    query: ["startAt", "maxResults", "orderBy", "componentSource", "query"],
  },
});
