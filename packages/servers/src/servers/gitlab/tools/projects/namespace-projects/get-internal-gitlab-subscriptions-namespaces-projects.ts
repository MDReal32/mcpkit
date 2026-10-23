import { defineTool } from "@usemcpkit/core";

export const projectsNamespaceProjectsGetInternalGitlabSubscriptionsNamespacesProjects = defineTool({
  name: "projects:namespace_projects:get_internal_gitlab_subscriptions_namespaces_projects",
  description:
    "Returns the projects of a namespace (including subgroups), with license data included. Used by CustomersDot to check OSS program compliance for a namespace, avoiding one API call per project to fetch license data.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID or URL-encoded path of the namespace",
      },
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
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/internal/gitlab_subscriptions/namespaces/{id}/projects",
    query: ["page", "per_page"],
  },
});
