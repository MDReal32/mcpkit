import { defineTool } from "@usemcpkit/core";

export const orgsTeamsAddOrUpdateRepoPermissionsInOrg = defineTool({
  name: "orgs:teams:add_or_update_repo_permissions_in_org",
  description:
    "Add or update team repository permissions. To add a repository to a team or update the team's permission on a repository, the authenticated user must have admin access to the repository, and must be able to see the team. The repository must be owned by the organization, or a direct fork of a repository owned by the organization. You will get a `422 Unprocessable Entity` status if you attempt to add a repository to a team that is not owned…",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      team_slug: {
        type: "string",
        description: "The slug of the team name.",
      },
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
      permission: {
        type: "string",
        description:
          "The permission to grant the team on this repository. We accept the following permissions to be set: `pull`, `triage`, `push`, `maintain`, `admin` and you can also specify a custom repository role name, if the owning organization has defined any. If no permission is specified, the team's `permission` attribute will be used to determine what permission to grant the team on this repository.",
      },
    },
    required: ["org", "team_slug", "owner", "repo"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}",
    body: ["permission"],
  },
});
