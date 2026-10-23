import { defineTool } from "@usemcpkit/core";

export const projectsProjectsJobTokenScopeDeleteProjectsJobTokenScopeGroupsAllowlist = defineTool({
  name: "projects:projects_job_token_scope:delete_projects_job_token_scope_groups_allowlist",
  description:
    "Delete a group from a CI/CD job token allowlist. Deletes a group from the CI/CD job token allowlist of a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the project.",
      },
      target_group_id: {
        type: "integer",
        description: "ID of the group to remove from the CI/CD job token groups allowlist.",
      },
    },
    required: ["id", "target_group_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/job_token_scope/groups_allowlist/{target_group_id}",
  },
});
