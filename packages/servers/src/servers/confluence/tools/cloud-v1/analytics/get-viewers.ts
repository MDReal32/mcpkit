import { defineTool } from "@usemcpkit/core";

export const cloudV1AnalyticsGetViewers = defineTool({
  name: "cloud_v1:analytics:get_viewers",
  description: "[Cloud v1] Get viewers. Get the total number of distinct viewers a piece of content has.",
  input: {
    type: "object",
    properties: {
      contentId: {
        type: "string",
        description: "The ID of the content to get the viewers for.",
      },
      fromDate: {
        type: "string",
        description: "The number of views for the content since the date.",
      },
    },
    required: ["contentId"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/analytics/content/{contentId}/viewers",
    query: ["fromDate"],
  },
});
