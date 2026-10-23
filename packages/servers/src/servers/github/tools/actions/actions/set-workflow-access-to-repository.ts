import { defineTool } from "@usemcpkit/core";

export const actionsActionsSetWorkflowAccessToRepository = defineTool({
  name: "actions:actions:set_workflow_access_to_repository",
  description:
    'Set the level of access for workflows outside of the repository. Sets the level of access that workflows outside of the repository have to actions and reusable workflows in the repository. This endpoint only applies to private repositories. For more information, see "Allowing access to components in a private repository".',
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
      access_level: {
        type: "string",
        description:
          "Defines the level of access that workflows outside of the repository have to actions and reusable workflows within the repository.",
        enum: ["none", "user", "organization"],
      },
    },
    required: ["owner", "repo", "access_level"],
  },
  request: {
    method: "PUT",
    path: "/repos/{owner}/{repo}/actions/permissions/access",
    body: ["access_level"],
  },
});
