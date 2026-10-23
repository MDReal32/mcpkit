import { defineTool } from "@usemcpkit/core";

export const actionsOidcCreateOidcCustomPropertyInclusionForOrg = defineTool({
  name: "actions:oidc:create_oidc_custom_property_inclusion_for_org",
  description:
    "Create an OIDC custom property inclusion for an organization. Adds a repository custom property to be included in the OIDC token for repository actions in an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      custom_property_name: {
        type: "string",
        description: "The name of the custom property to include in the OIDC token",
      },
    },
    required: ["org", "custom_property_name"],
  },
  request: {
    method: "POST",
    path: "/orgs/{org}/actions/oidc/customization/properties/repo",
    body: ["custom_property_name"],
  },
});
