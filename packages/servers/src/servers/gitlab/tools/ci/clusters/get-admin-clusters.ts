import { defineTool } from "@usemcpkit/core";

export const ciClustersGetAdminClusters = defineTool({
  name: "ci:clusters:get_admin_clusters",
  description: "Retrieve a single instance cluster. Retrieves a specified instance cluster.",
  input: {
    type: "object",
    properties: {
      cluster_id: {
        type: "integer",
        description: "ID of the cluster.",
      },
    },
    required: ["cluster_id"],
  },
  request: {
    method: "GET",
    path: "/admin/clusters/{cluster_id}",
  },
});
