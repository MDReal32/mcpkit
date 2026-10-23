import { defineTool } from "@usemcpkit/core";

export const metaInstanceGetApplicationStatistics = defineTool({
  name: "meta:instance:get_application_statistics",
  description:
    "Retrieve application statistics. Retrieves the current application statistics for this GitLab instance.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/application/statistics",
  },
});
