import { defineTool } from "@usemcpkit/core";

export const ciCiVariablesListAdminCiVariables = defineTool({
  name: "ci:ci_variables:list_admin_ci_variables",
  description:
    "List all instance variables. Lists all instance-level variables. Use the `page` and `per_page` pagination parameters to control the pagination of results.",
  input: {
    type: "object",
    properties: {
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/admin/ci/variables",
    query: ["page", "per_page"],
  },
});
