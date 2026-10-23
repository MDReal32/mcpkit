import { defineTool } from "@usemcpkit/core";

export const projectsDeployResourcesListDeployKeys = defineTool({
  name: "projects:deploy_resources:list_deploy_keys",
  description: "List all deploy keys. Lists all deploy keys for the instance.",
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
      public: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only deploy keys that are public.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/deploy_keys",
    query: ["page", "per_page", "public"],
  },
});
