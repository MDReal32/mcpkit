import { defineTool } from "@usemcpkit/core";

export const reposReposListCollaborators = defineTool({
  name: "repos:repos:list_collaborators",
  description:
    "List repository collaborators. For organization-owned repositories, the list of collaborators includes outside collaborators, organization members that are direct collaborators, organization members with access through team memberships, organization members with access through default organization permissions, and organization owners. The `permissions` hash returned in the response contains the base role permissions of the col…",
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
      affiliation: {
        type: "string",
        default: "all",
        enum: ["outside", "direct", "all"],
        description:
          "Filter collaborators returned by their affiliation. `outside` means all outside collaborators of an organization-owned repository. `direct` means all collaborators with permissions to an organization-owned repository, regardless of organization membership status. `all` means all collaborators the authenticated user can see.",
      },
      permission: {
        type: "string",
        enum: ["pull", "triage", "triage_plus", "push", "maintain", "admin"],
        description:
          "Filter collaborators by the permissions they have on the repository. If not specified, all collaborators will be returned.",
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
    required: ["owner", "repo"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/collaborators",
    query: ["affiliation", "permission", "per_page", "page"],
  },
});
