import { defineTool } from "@usemcpkit/core";

export const metaUsageDataCreateUsageDataIncrementCounter = defineTool({
  name: "meta:usage_data:create_usage_data_increment_counter",
  description: "Track usage data event. This feature was introduced in GitLab 13.4.",
  input: {
    type: "object",
    properties: {
      event: {
        type: "string",
        description: "Event name that should be tracked.",
      },
    },
    required: ["event"],
  },
  request: {
    method: "POST",
    path: "/usage_data/increment_counter",
    body: ["event"],
  },
});
