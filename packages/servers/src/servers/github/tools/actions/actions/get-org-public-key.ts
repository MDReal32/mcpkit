import { defineTool } from "@usemcpkit/core";

export const actionsActionsGetOrgPublicKey = defineTool({
  name: "actions:actions:get_org_public_key",
  description:
    "Get an organization public key. Gets your public key, which you need to encrypt secrets. You need to encrypt a secret before you can create or update secrets.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
    },
    required: ["org"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/actions/secrets/public-key",
  },
});
