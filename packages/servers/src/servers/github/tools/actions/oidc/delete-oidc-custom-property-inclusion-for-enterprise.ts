import { defineTool } from "@usemcpkit/core";

export const actionsOidcDeleteOidcCustomPropertyInclusionForEnterprise = defineTool({
  name: "actions:oidc:delete_oidc_custom_property_inclusion_for_enterprise",
  description:
    "Delete an OIDC custom property inclusion for an enterprise. Removes a repository custom property from being included in the OIDC token for repository actions in an enterprise.",
  input: {
    type: "object",
    properties: {
      enterprise: {
        type: "string",
        description: "The slug version of the enterprise name.",
      },
      custom_property_name: {
        type: "string",
        description: "The name of the custom property to remove from OIDC token inclusion",
      },
    },
    required: ["enterprise", "custom_property_name"],
  },
  request: {
    method: "DELETE",
    path: "/enterprises/{enterprise}/actions/oidc/customization/properties/repo/{custom_property_name}",
  },
});
