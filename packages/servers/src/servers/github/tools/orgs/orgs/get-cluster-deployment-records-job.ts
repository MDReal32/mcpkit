import { defineTool } from "@usemcpkit/core";

export const orgsOrgsGetClusterDeploymentRecordsJob = defineTool({
  name: "orgs:orgs:get_cluster_deployment_records_job",
  description:
    "Get cluster deployment records job status. Get the status and results of a previously created cluster deployment records job.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      cluster: {
        type: "string",
        description: "The cluster name.",
      },
      job_id: {
        type: "integer",
        description: "The ID of the job.",
      },
    },
    required: ["org", "cluster", "job_id"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/artifacts/metadata/deployment-record/cluster/{cluster}/jobs/{job_id}",
  },
});
