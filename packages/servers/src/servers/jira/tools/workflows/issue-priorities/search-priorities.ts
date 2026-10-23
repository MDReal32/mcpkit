import { defineTool } from "@usemcpkit/core";

export const workflowsIssuePrioritiesSearchPriorities = defineTool({
  name: "workflows:issue_priorities:search_priorities",
  description:
    "Search priorities. Returns a paginated list of priorities. The list can contain all priorities or a subset determined by any combination of these criteria:",
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
      id: {
        type: "string",
        description:
          "The list of priority IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=2&id=3`. (comma-separated)",
      },
      projectId: {
        type: "string",
        description:
          "The list of projects IDs. To include multiple IDs, provide an ampersand-separated list. For example, `projectId=10010&projectId=10111`. (comma-separated)",
      },
      priorityName: {
        type: "string",
        default: "",
        description: "The name of priority to search for.",
      },
      onlyDefault: {
        type: "boolean",
        default: false,
        description: "Whether only the default priority is returned.",
      },
      expand: {
        type: "string",
        default: "",
        description:
          "Use `schemes` to return the associated priority schemes for each priority. Limited to returning first 15 priority schemes per priority.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/priority/search",
    query: ["startAt", "maxResults", "id", "projectId", "priorityName", "onlyDefault", "expand"],
  },
});
