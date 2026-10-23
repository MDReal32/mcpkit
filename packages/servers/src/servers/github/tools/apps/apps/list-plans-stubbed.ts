import { defineTool } from "@usemcpkit/core";

export const appsAppsListPlansStubbed = defineTool({
  name: "apps:apps:list_plans_stubbed",
  description: "List plans (stubbed). Lists all plans that are part of your GitHub Marketplace listing.",
  input: {
    type: "object",
    properties: {
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
  },
  request: {
    method: "GET",
    path: "/marketplace_listing/stubbed/plans",
    query: ["per_page", "page"],
  },
});
