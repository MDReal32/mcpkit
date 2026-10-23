import { defineTool } from "@usemcpkit/core";

export const orgsOrgsCreateArtifactDeploymentRecord = defineTool({
  name: "orgs:orgs:create_artifact_deployment_record",
  description:
    "Create an artifact deployment record. Create or update deployment records for an artifact associated with an organization. This endpoint allows you to record information about a specific artifact, such as its name, digest, environments, cluster, and deployment. The deployment name has to be uniqe within a cluster (i.e a combination of logical, physical environment and cluster) as it identifies unique deployment. Multiple requests for…",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      name: {
        type: "string",
        description: "The name of the artifact.",
      },
      digest: {
        type: "string",
        description: "The hex encoded digest of the artifact.",
      },
      version: {
        type: "string",
        description: "The artifact version.",
      },
      status: {
        type: "string",
        description: "The status of the artifact. Can be either deployed or decommissioned.",
        enum: ["deployed", "decommissioned"],
      },
      logical_environment: {
        type: "string",
        description: "The stage of the deployment.",
      },
      physical_environment: {
        type: "string",
        description: "The physical region of the deployment.",
      },
      cluster: {
        type: "string",
        description: "The deployment cluster.",
      },
      deployment_name: {
        type: "string",
        description:
          "The unique identifier for the deployment represented by the new record. To accommodate differing containers and namespaces within a cluster, the following format is recommended: {namespaceName}-{deploymentName}-{containerName}.",
      },
      tags: {
        type: "object",
        description: "The tags associated with the deployment.",
      },
      runtime_risks: {
        type: "array",
        description: "A list of runtime risks associated with the deployment.",
        items: {
          type: "string",
          enum: ["critical-resource", "internet-exposed", "lateral-movement", "sensitive-data"],
        },
      },
      github_repository: {
        type: "string",
        description:
          "The name of the GitHub repository associated with the artifact. This should be used when there are no provenance attestations available for the artifact. The repository must belong to the organization specified in the path parameter.",
      },
      return_records: {
        type: "boolean",
        description: "If true, the endpoint will return the created or updated record in the response body.",
        default: true,
      },
    },
    required: ["org", "name", "digest", "status", "logical_environment", "deployment_name"],
  },
  request: {
    method: "POST",
    path: "/orgs/{org}/artifacts/metadata/deployment-record",
    body: [
      "name",
      "digest",
      "version",
      "status",
      "logical_environment",
      "physical_environment",
      "cluster",
      "deployment_name",
      "tags",
      "runtime_risks",
      "github_repository",
      "return_records",
    ],
  },
});
