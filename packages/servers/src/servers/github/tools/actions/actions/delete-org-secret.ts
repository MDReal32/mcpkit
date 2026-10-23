import { defineTool } from "@usemcpkit/core";

export const actionsActionsDeleteOrgSecret = defineTool({
  name: "actions:actions:delete_org_secret",
  description: "Delete an organization secret. Deletes a secret in an organization using the secret name.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      secret_name: {
        type: "string",
        description: "The name of the secret.",
      },
    },
    required: ["org", "secret_name"],
  },
  request: {
    method: "DELETE",
    path: "/orgs/{org}/actions/secrets/{secret_name}",
  },
});
