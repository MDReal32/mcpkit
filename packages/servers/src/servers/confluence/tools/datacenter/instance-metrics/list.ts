import { defineTool } from "@usemcpkit/core";

export const datacenterInstanceMetricsList = defineTool({
  name: "datacenter:instance_metrics:list",
  description: "[Data Center] Get instance metrics. Returns simple metrics about this instance.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/instance-metrics",
  },
});
