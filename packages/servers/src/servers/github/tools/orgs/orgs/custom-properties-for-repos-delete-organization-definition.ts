import { defineTool } from "@usemcpkit/core";

export const orgsOrgsCustomPropertiesForReposDeleteOrganizationDefinition = defineTool({
  name: "orgs:orgs:custom_properties_for_repos_delete_organization_definition",
  description:
    "Remove a custom property for an organization. Removes a custom property that is defined for an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      custom_property_name: {
        type: "string",
        description: "The custom property name",
      },
    },
    required: ["org", "custom_property_name"],
  },
  request: {
    method: "DELETE",
    path: "/orgs/{org}/properties/schema/{custom_property_name}",
  },
});
