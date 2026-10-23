import { defineTool } from "@usemcpkit/core";

export const fieldsScreenTabsGetBulkScreenTabs = defineTool({
  name: "fields:screen_tabs:get_bulk_screen_tabs",
  description: "Get bulk screen tabs. Returns the list of tabs for a bulk of screens.",
  input: {
    type: "object",
    properties: {
      screenId: {
        type: "string",
        description:
          "The list of screen IDs. To include multiple screen IDs, provide an ampersand-separated list. For example, `screenId=10000&screenId=10001`. (comma-separated)",
      },
      tabId: {
        type: "string",
        description:
          "The list of tab IDs. To include multiple tab IDs, provide an ampersand-separated list. For example, `tabId=10000&tabId=10001`. (comma-separated)",
      },
      startAt: {
        type: "integer",
        default: 0,
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResult: {
        type: "integer",
        default: 100,
        description: "The maximum number of items to return per page. The maximum number is 100,",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/screens/tabs",
    query: ["screenId", "tabId", "startAt", "maxResult"],
  },
});
