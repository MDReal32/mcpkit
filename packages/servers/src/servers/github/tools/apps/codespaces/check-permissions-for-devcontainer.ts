import { defineTool } from "@usemcpkit/core";

export const appsCodespacesCheckPermissionsForDevcontainer = defineTool({
  name: "apps:codespaces:check_permissions_for_devcontainer",
  description:
    "Check if permissions defined by a devcontainer have been accepted by the authenticated user. Checks whether the permissions defined by a given devcontainer configuration have been accepted by the authenticated user.",
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
      ref: {
        type: "string",
        description:
          'The git reference that points to the location of the devcontainer configuration to use for the permission check. The value of `ref` will typically be a branch name (`heads/BRANCH_NAME`). For more information, see "Git References" in the Git documentation.',
      },
      devcontainer_path: {
        type: "string",
        description: "Path to the devcontainer.json configuration to use for the permission check.",
      },
    },
    required: ["owner", "repo", "ref", "devcontainer_path"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/codespaces/permissions_check",
    query: ["ref", "devcontainer_path"],
  },
});
