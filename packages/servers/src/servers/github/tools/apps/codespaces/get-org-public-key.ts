import { defineTool } from "@usemcpkit/core";

export const appsCodespacesGetOrgPublicKey = defineTool({
  name: "apps:codespaces:get_org_public_key",
  description:
    "Get an organization public key. Gets a public key for an organization, which is required in order to encrypt secrets. You need to encrypt the value of a secret before you can create or update secrets. OAuth app tokens and personal access tokens (classic) need the `admin:org` scope to use this endpoint.",
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
    path: "/orgs/{org}/codespaces/secrets/public-key",
  },
});
