import { defineTool } from "@usemcpkit/core";

export const workflowsPrioritySchemesGetPrioritySchemes = defineTool({
  name: "workflows:priority_schemes:get_priority_schemes",
  description: "Get priority schemes. Returns a paginated list of priority schemes.",
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
      priorityId: {
        type: "string",
        description:
          "A set of priority IDs to filter by. To include multiple IDs, provide an ampersand-separated list. For example, `priorityId=10000&priorityId=10001`. (comma-separated)",
      },
      schemeId: {
        type: "string",
        description:
          "A set of priority scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `schemeId=10000&schemeId=10001`. (comma-separated)",
      },
      schemeName: {
        type: "string",
        default: "",
        description: "The name of scheme to search for.",
      },
      onlyDefault: {
        type: "boolean",
        default: false,
        description: "Whether only the default priority is returned.",
      },
      orderBy: {
        type: "string",
        default: "+name",
        enum: ["name", "+name", "-name"],
        description: "The ordering to return the priority schemes by.",
      },
      expand: {
        type: "string",
        description:
          'A comma separated list of additional information to return. "priorities" will return priorities associated with the priority scheme. "projects" will return projects associated with the priority scheme. `expand=priorities,projects`.',
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/priorityscheme",
    query: ["startAt", "maxResults", "priorityId", "schemeId", "schemeName", "onlyDefault", "orderBy", "expand"],
  },
});
