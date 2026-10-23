import { defineTool } from "@usemcpkit/core";

export const ciClustersDeleteProjectsClusters = defineTool({
  name: "ci:clusters:delete_projects_clusters",
  description:
    "Delete cluster from a project. Deletes a specified cluster from a project. Does not remove existing resources in the connected Kubernetes cluster.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      cluster_id: {
        type: "integer",
        description: "ID of the cluster.",
      },
    },
    required: ["id", "cluster_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/clusters/{cluster_id}",
  },
});
