import { defineTool } from "@usemcpkit/core";

export const securityPrivateRegistriesGetOrgPrivateRegistry = defineTool({
  name: "security:private_registries:get_org_private_registry",
  description:
    "Get a private registry for an organization. Get the configuration of a single private registry defined for an organization, omitting its encrypted value.",
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
    method: "GET",
    path: "/orgs/{org}/private-registries/{secret_name}",
  },
});
