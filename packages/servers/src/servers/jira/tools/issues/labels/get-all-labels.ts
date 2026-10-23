import { defineTool } from "@usemcpkit/core";

export const issuesLabelsGetAllLabels = defineTool({
  name: "issues:labels:get_all_labels",
  description: "Get all labels. Returns a paginated list of labels.",
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
        default: 1000,
        description: "The maximum number of items to return per page.",
      },
      query: {
        type: "string",
        description: "Case-insensitive prefix used to filter labels before pagination.",
      },
      scope: {
        type: "string",
        description:
          "RECENT\\_PROJECTS or ALL\\_BROWSEABLE\\_PROJECTS. Omitted scope retains the unbounded search. Blank or unrecognised values use ALL\\_BROWSEABLE\\_PROJECTS.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/label",
    query: ["startAt", "maxResults", "query", "scope"],
  },
});
