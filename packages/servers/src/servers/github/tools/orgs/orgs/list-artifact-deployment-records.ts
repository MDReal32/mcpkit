import { defineTool } from "@usemcpkit/core";

export const orgsOrgsListArtifactDeploymentRecords = defineTool({
  name: "orgs:orgs:list_artifact_deployment_records",
  description:
    "List artifact deployment records. List deployment records for an artifact metadata associated with an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      subject_digest: {
        type: "string",
        description: "The SHA256 digest of the artifact, in the form `sha256:HEX_DIGEST`.",
      },
    },
    required: ["org", "subject_digest"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/artifacts/{subject_digest}/metadata/deployment-records",
  },
});
