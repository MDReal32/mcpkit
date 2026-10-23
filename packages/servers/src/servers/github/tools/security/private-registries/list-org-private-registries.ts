import { defineTool } from "@usemcpkit/core";

export const securityPrivateRegistriesListOrgPrivateRegistries = defineTool({
  name: "security:private_registries:list_org_private_registries",
  description:
    "List private registries for an organization. Lists all private registry configurations available at the organization-level without revealing their encrypted values.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ["org"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/private-registries",
    query: ["per_page", "page"],
  },
});
