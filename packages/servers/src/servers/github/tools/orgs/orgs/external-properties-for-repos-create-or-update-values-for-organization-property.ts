import { defineTool } from "@usemcpkit/core";

export const orgsOrgsExternalPropertiesForReposCreateOrUpdateValuesForOrganizationProperty = defineTool({
  name: "orgs:orgs:external_properties_for_repos_create_or_update_values_for_organization_property",
  description:
    "Create or update external custom property values for a property across organization repositories. Create new or update existing external custom property values for a single named property across repositories that belong to an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      property_name: {
        type: "string",
        description: "The name of the external custom property",
      },
      repository_values: {
        type: "array",
        description: "The names of repositories and the values that the named external custom property will be set to.",
        items: {
          type: "object",
          description: "Repository name and associated external custom property value",
          properties: {
            repository_name: {
              type: "string",
              description: "The name of the repository",
            },
            value: {
              type: "string",
              description:
                "The value assigned to the repository. Set to `null` to unset the value for this repository.",
            },
          },
          required: ["repository_name", "value"],
        },
      },
    },
    required: ["org", "property_name", "repository_values"],
  },
  request: {
    method: "PATCH",
    path: "/orgs/{org}/properties/installations/values/{property_name}",
    body: ["repository_values"],
  },
});
