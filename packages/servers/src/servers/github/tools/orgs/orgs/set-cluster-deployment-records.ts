import { defineTool } from "@usemcpkit/core";

export const orgsOrgsSetClusterDeploymentRecords = defineTool({
  name: "orgs:orgs:set_cluster_deployment_records",
  description:
    "Set cluster deployment records. Set deployment records for a given cluster. If proposed records in the 'deployments' field have identical 'cluster', 'logical_environment', 'physical_environment', and 'deployment_name' values as existing records, the existing records will be updated. If no existing records match, new records will be created. Note: Artifacts are uniquely identified by the combination of their repository and diges…",
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
      logical_environment: {
        type: "string",
        description: "The stage of the deployment.",
      },
      physical_environment: {
        type: "string",
        description: "The physical region of the deployment.",
      },
      deployments: {
        type: "array",
        description: "The list of deployments to record.",
        items: {
          type: "object",
          properties: {
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
              description: "The deployment status of the artifact.",
              default: "deployed",
              enum: ["deployed", "decommissioned"],
            },
            deployment_name: {
              type: "string",
              description:
                "The unique identifier for the deployment represented by the new record. To accommodate differing containers and namespaces within a record set, the following format is recommended: {namespaceName}-{deploymentName}-{containerName}. The deployment_name must be unique across all entries in the deployments array.",
            },
            github_repository: {
              type: "string",
              description:
                "The name of the GitHub repository associated with the artifact. This should be used when there are no provenance attestations available for the artifact. The repository must belong to the organization specified in the path parameter.",
            },
            tags: {
              type: "object",
              description: "Key-value pairs to tag the deployment record.",
            },
            runtime_risks: {
              type: "array",
              description: "A list of runtime risks associated with the deployment.",
              items: {
                type: "string",
                enum: ["critical-resource", "internet-exposed", "lateral-movement", "sensitive-data"],
              },
            },
          },
          required: ["name", "deployment_name", "digest"],
        },
      },
      partial_success: {
        type: "boolean",
        description:
          "When enabled, deployments associated with repositories the actor can write to are processed while deployments associated with repositories that cannot be resolved or written to by the actor are skipped and reported in the `errors` array. When false (the default), the endpoint returns an error if any targeted repository cannot be resolved, the actor lacks write access, or no matching attestation c…",
        default: false,
      },
      return_records: {
        type: "boolean",
        description: "If true, the endpoint will return the set records in the response body",
        default: true,
      },
    },
    required: ["org", "cluster", "logical_environment", "deployments"],
  },
  request: {
    method: "POST",
    path: "/orgs/{org}/artifacts/metadata/deployment-record/cluster/{cluster}",
    body: ["logical_environment", "physical_environment", "deployments", "partial_success", "return_records"],
  },
});
