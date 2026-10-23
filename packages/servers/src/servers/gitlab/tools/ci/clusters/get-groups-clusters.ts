import { defineTool } from "@usemcpkit/core";

export const ciClustersGetGroupsClusters = defineTool({
  name: "ci:clusters:get_groups_clusters",
  description: "Retrieve a group cluster. Retrieves a specified group cluster.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      cluster_id: {
        type: "integer",
        description: "ID of the cluster.",
      },
    },
    required: ["id", "cluster_id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/clusters/{cluster_id}",
  },
});
